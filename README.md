<h3>GitHub link <a href="https://github.com/dumitrubrinza/dBlogAS">dBlogApp</a></h3> 

<p>Runing app in HEROKU link ---> <a href="http://safe-sands-20956.herokuapp.com" >http://safe-sands-20956.herokuapp.com</a></p>

##Demo Authentication 
```javascript                       
email :  homer@simpson.com
password: secret     
```
***

#Assignment 2 - MEAN app.

Name: **Dumitru Brinza**

###Overview.
This is a blog app (dBlog) that I created. It allows users to sign up or sign in directly through their google accounts allowing ease of access.  The posts are listed with a short synopsis first and the user has the option to 'read more' should they wish where they can see the full content and use the pagination feature to scroll through various synopses. Once logged in they can read through posts, leave comments and they also have to option to 'like' or 'dislike' each post. They can also use the search feature to search through posts containing particular words. This app also allows the user to create their own post with various text indentation and tab options, including images and video (due to the use of textAngular). 


List of user features  
 
 + Signing up - using UserApp user management
 + Signing in (social log in(Google+)) - using UserApp user management
 + Pagination of posts - (using angular-utils-pagination)
 + Search through posts 
 + Create your post
 + textAngular form input
 + Post comments
 + Like\Dislike comments

###Installation requirements.
. . . .  List of software used to develop the app . . . . . . .

**Server side**

```
"dependencies": {
        "express": "~4.0.0",
        "debug": "~0.7.4",
        "morgan": "~1.0.0",
        "body-parser": "~1.0.0",
        "mongoose": "~3.8.8",
        "errorhandler": "~1.0.0",
        "lodash": "~2.4.1",
        "cookie-parser": "~1.0.1"
     }
``` 
 **Client side**

 ```
"dependencies": {
    "angular": "1.4.x",
    "angular-mocks": "1.4.x",
    "jquery": "~2.1.1",
    "bootstrap": "3.3.6",
    "angular-route": "1.4.x",
    "angular-resource": "1.4.x",
    "angular-messages": "1.4.x",
    "angular-cookies": "1.4.x",
    "angular-utils-pagination": "0.11.0",
    "bootstrap-social": "^5.0.0"
  }
  
 also

 textAngular (rangy, sanitize)
 font-awesome
 angular-animate
 ```

###Data Model Design.

Diagram of app's data model.

![][image1]

###UI Design.
####Screenshots of app's views with appropriate captions  
Login View
![][image4]
Main View
![][image2]
Comments (likes/dislikes)
![][image5]

## Web API Endpoint Reference

Describe your web API.

+ GET   /                                        - displays Main pege if user authenticated - otherwise Login or Signup view
+ GET   /:id                                     - detail view of a particular post (:id)
+ POST  /                                        - display the add article view
+ POST  /:id/comments                            - add comment to an article
+ POST  /:post_id/comments/:comment_id/upvotes   - add a like to a comment
+ POST  /:post_id/comments/:comment_id/downvotes - add a dislike to a comment

###Extra features

+ Third party User Authentication - UserApp 
+ Pagination
+ textAngular
+ ... 

###Independent learning.

. . . . . State the non-standard aspects of Angular (or other related technologies) that you researched and applied in this assignment . . . . . 

+ Third party User Authentication
+ Pagination
+ textAngular
+ ng-bind-html="article.data | cut:true:400: ' ... '  | toTrusted "
+ $sce.trustAsHtml(value) - filter

[image1]: ./RMFolder/model.png
[image2]: ./RMFolder/style.png
[image4]: ./RMFolder/login.png
[image5]: ./RMFolder/comment.png