# Community Github Labs

* Watch this space.

## Participant steps:
* Fork the repo
* Go to your preferred IDE/Editor and clone the Forked repo. This can be found on the fork on your account.
* Open the project
* Go to the `community.json` file and copy the following JSON object and replace the values with your own:
```json
{
    "name": "your_name_or_alias",
    "course_start": "year_of_course_start",
    "course_stage": "student_alum_staff_mentor",
    "favorite_language": "favorite_language",
    "currently_learning": "latest_learning"
}
```
    Keep these short and sweet. This is just the pre-cursor needed to link to your creation in this community.
* Paste this after the latest object in the `community.json` file.
* A small example of the json file:
```json
[
    {
        "name": "auxfuse",
        "course_start": "2019",
        "course_stage": "Alumni",
        "favorite_language": "CSS",
        "currently_learning": "PHP/ThreeJS"
    },
    {
        "name": "Person",
        "course_start": "1990",
        "course_stage": "Student",
        "favorite_language": "VBA",
        "currently_learning": "Soft skills"
    }
]
```
    Notice that the JSON objects, those inside the curly braces `{}`, are separated by a comma.
    Each individual set of key/value pair inside the JSON objects, are also separated by a comma.
    Keys and values are separated by a colon, `:`.

* At this point, click on the `community` directory and add a folder using the same value as the name (case sensitive) you used in the JSON object.
    For example, if the name in the JSON object was "john", then the name of the directory inside the `community` directory must be also called "john".
* Inside this named and newly created directory, please create an `index.html` file and a `style.css` file and link them together.
* Then you can create your custom html/css piece.

    Up to here, you will have successfully forked the project, cloned it, opened it, added to a dataset, created a sub-directory, and done some coding too. We do all of this so that the default project structure is left un-mutated and that you are automatically added to the root `index.html` file Community section. This is a fun way to meet new developers who you may one day be coding alongside of in a team, or asking them for help with a query in the Slack CI community.