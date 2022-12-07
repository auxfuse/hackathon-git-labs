let user = 'JiiXaa';
let URL = 'https://api.github.com/users/' + user;
let reposURL = 'https://api.github.com/users/' + user + '/repos?per_page=100';

fetch(URL)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    const {
      login,
      name,
      location,
      company,
      avatar_url,
      created_at,
      public_repos,
      followers,
      following,
    } = myJson;
    // console.log(myJson);
    const joined = formatDate(created_at);
    document.getElementById('userName').innerText = name;
    document.getElementById('userLogin').innerText = `@${login}`;
    document.getElementById('userImg').src = avatar_url;
    if (company) document.querySelector('.company-name').innerText = company;
    if (location) document.querySelector('.location').innerText = location;
    document.querySelector('.joined-date').innerText = `Joined ${joined}`;
    document.querySelector('.repo').innerText = public_repos;
    document.querySelector('.following').innerText = following;
    document.querySelector('.followers').innerText = followers;
  });

const formatDate = (rawDate) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let d = new Date(rawDate);
  let curr_date = d.getDate();
  let curr_month = months[d.getMonth()];
  let curr_year = d.getFullYear();
  return curr_month + ' ' + curr_date + ', ' + curr_year;
};

fetch(reposURL)
  .then((repos) => repos.json())
  .then(async (repos) => {
    let starRepos = repos
      .filter((repo) => repo.stargazers_count > 0)
      .sort((a, b) => {
        return b.stargazers_count - a.stargazers_count;
      });

    let promises = []; //store an object with the languages for each repo
    let languagesMap = new Map(); //map the languages and the values in kilobytes

    for (repo of starRepos) {
      // console.log(repo.name);
      let languagesPromise = await fetch(repo.languages_url);
      promises.push(languagesPromise.json());
      if (promises.length > 5) break;
    }

    if (promises.length < 5) {
      let recentRepos = repos
        .filter((repo) => repo.stargazers_count == 0)
        .sort((a, b) => {
          let da = new Date(a.updated_at),
            db = new Date(b.updated_at);
          return db - da;
        });

      for (repo of recentRepos) {
        // console.log(repo.name);
        let languagesPromise = await fetch(repo.languages_url);
        promises.push(languagesPromise.json());
        if (promises.length > 5) break;
      }
    }

    Promise.all(promises).then((languages) => {
      // console.log(languages);
      for (obj of languages) {
        for (const [key, value] of Object.entries(obj)) {
          if (languagesMap.has(`${key}`))
            languagesMap.set(`${key}`, languagesMap.get(`${key}`) + value);
          else languagesMap.set(`${key}`, value);
        }
      }

      const languagesMapSort = new Map(
        [...languagesMap.entries()].sort((a, b) => b[1] - a[1])
      );
      // console.log(languagesMapSort);

      const maxValBytes = languagesMapSort.values().next().value;

      languagesMapSort.forEach((value, key) => {
        // console.log(value);
        document.querySelectorAll(
          '.graph-body'
        )[0].innerHTML += `<div class="graph-bar" style = 'background-color: gray; width: ${
          (value / maxValBytes) * 100
        }%'></div><div class='graph-label'><span>${key}</span><span>${value}kb</span></div>`;
      });
    });
  });
