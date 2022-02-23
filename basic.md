# Basics guide to making your first Pull Request (PR)

By following the below guide, you will have created a card on the Landing page of the project, with some information displayed about you. It's a fun little exercise that showcases the community members & participants at large. 🤜

Get started! Make your first PR and get going into the world of open source! 

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

Notice that the JSON objects, those inside the curly braces `{}`, are separated by a comma.
Each individual set of key/value pair inside the JSON objects, are also separated by a comma.
Keys and values are separated by a colon, `:`.

