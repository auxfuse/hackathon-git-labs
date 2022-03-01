# Basics guide to making your first Pull Request (PR)

By following the below guide, your actions will have created a card on the Landing page of the project, with some information displayed about you. It's a fun little exercise that gives you the steps to navigate the project and make your first Open Source Contribution to this project (or maybe it is your very first ever!) via Pull Request (PR). 🤜

Get started! Make your first PR and get going into the world of open source! 

## 👇 Participant steps: 👇
- Fork the repo
- Go to your preferred IDE/Editor and clone the Forked repo. This can be found on the fork on your account.
- Using your preferred IDE, Open the project
- Set the upstream
- Create a branch
- Go to the `community.json` file and copy the following JSON object and replace the _**values**_ with your own:
```json
{
    "name": "your_name_or_alias",
    "course_start": "year_of_course_start",
    "course_stage": "student_alum_staff_mentor",
    "favorite_language": "favorite_language",
    "currently_learning": "latest_learning"
}
```

For reference, the _**values**_ are on the right side of the colon (`:`), and are contained inside the double quotes (`""`). Take a look at this snapshot:

![JSON Values Reference](https://github.com/auxfuse/hackathon-git-labs/docs/images/JSONvalue.png)

Keep these short and sweet. This is just a small blurb about you as a developer. _Anything that exceeds the bounds of the card itself will be truncated._

- Paste this updated JSON Object after the latest object in the `community.json` file.
- A small example of the json file:

```json
[
    {
        "name": "anthony",
        "course_start": "2019",
        "course_stage": "Alumni",
        "favorite_language": "CSS",
        "currently_learning": "PHP/ThreeJS"
    },
    {
        "name": "john",
        "course_start": "2020",
        "course_stage": "Student",
        "favorite_language": "javscript",
        "currently_learning": "vue.Js"
    }
]
```
- The JSON is formatted as follows:
    - Notice that the JSON objects, those inside the curly braces, and inclusive of the curly braces `{}`, are separated by a comma. 👈 **This part is super important when pasting in your own JSON Object.**
    - Each individual set of key/value pair inside the JSON objects, are also separated by a comma.
    - Keys and values are separated by a colon, `:`.

After you have added yourself to the `community.json` file, you can now view the project in preview mode to see your card added to the website. Depending on your IDE/Editor of choice, there are a few ways to do this. Most IDEs/Editors will have a built in preview option. If you are unsure, a quick google search on how to do this for your editor is the best course of action.

- Add all your work to the branch using `git add .` 
- commit
- push to the branch
- at this stage, you might be reminded to set the branch as the current trackable option.
- create PR



