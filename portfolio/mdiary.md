---
layout: page
title: Portfolio - mDiary Study of Adolescent Relationships
technology: [ Ruby on Rails, MySQL, Bootstrap, Twilio API, Qualtrics API, GnuPG ]
---
# mDiary Study of Adolescent Relationships

[![screenshot of mdiary](/assets/images/mdiary.png)](/assets/images/mdiary.png)

## About the project

The mDiary Study of Adolescent Relationships administers bi-weekly surveys to cohorts of adolescents over a two-year period. The researchers at Princeton University needed a site with a responsive design that would encourage high participation rates throughout the study and direct each participant to the appropriate survey.

## My role

To kick off the project, a UX Design Strategist and I met with the researchers in Princeton, New Jersey. We went through various exercises to tease out the requirements and any troublesome user experience areas that we'd need to focus on. We collaborated on what the appropriate database schema would be given their requirements for using the data and anticipated alterations that they might need down the road.

As the sole developer on the project, my primary role was a sounding board for the designer and the development of the project. As the design portion of the project started to taper off, I assumed more of the project manager responsibilities in communicating with the researchers about the progress of the project and collecting their feedback.

The Ruby on Rails project consisted of a participant-facing interface that would allow participants to log in, update their contact information, view their progress through the surveys, link to their next available survey, and collect their Amazon Gift Cards based on their participation.

The Rails application included an admin interface for managing the participants, assigning them to cohorts, and creating a survey schedule for each cohort. I also built the application's notification system that would remind participants when surveys are available in order to encourage consistent participation throughout the 26 surveys. These reminders were sent out as emails and text messages via the [Twilio](https://www.twilio.com/) API.

The surveys were completed using [Qualtrics](https://www.qualtrics.com/). However, the researchers were using Qualtrics in an innovative fashion that required the Rails application to integrate with the Qualtrics API. Each survey's questions depended upon answers the participant gave in prior surveys. This meant that the application needed to implement the Qualtrics single-sign-on specification when creating the unique link that would direct the user to the proper survey and sign them in to Qualtrics.

The project also used incentives to reward participants for consistent survey completion. In order to ensure proper rewarding of incentives, the Rails application would use the Qualtrics API to verify each participant's survey completions. In addition, the survey results were periodically downloaded via the Qualtrics API, encrypted with GnuPG, and securely transferred to separate servers.
