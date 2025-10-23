# FormBuster
Source Code for the Form Buster Senior project http://a-merino.github.io/FormBusterSite/

## Need To Do (Most to Least Important)

### Frontend
1. **Inbox/Inbox.jsx**
    - Hook the inbox up to the new Signing system
    - Display comments when clicking on a message (outlook style)
    - Add notification popup on menu
1. **Home/FullForm/SigSide.jsx**
    - Figure out how to implement the information to show in this component when the graph is hovered
    - Add the rest of the classes for *SigLink* component
1. **Home/FullForm/SigTree.jsx**
    - Find a way to mathematically center the graph in the svg
    - Also to mathematically determine x and y coords of a node based on parent and amount of children
        - logic dependent still
    - Add user role to Graph in the node/ beside node
1. **Form/Form.jsx**
    - Standardize inputs for autofill of user information
    - Standardize form format
    - Remove submit buttons from inside of forms (the ones that dont work)
1. **Inbox/InboxInteractionbar.jsx**
    - Make the *refresh* and *mark all* buttons do something
1. **FormBuilder/Editor.jsx**
    - Luka, document your code and explain what is going on
1. **Account/Information.jsx**
    - Decrypt the password on Show Password
1. **SignForm/SignForm.jsx**
    - make disabled inputs look better (checkbox in specific)
    - check if Signature matches first and last name
1. **Auth/Register.jsx**
    - possibly better way to store input data in *handleChange()*
1. **LandingPage/LandingPage.jsx**
    - Describe our product better
        - More Features
        - More words for each feature
    - make it prettier


### Backend
1. **Add 
1. **controllers/currentFormFunctions.js *defaultSignature()***
    - Create logic to determine which faculty/admin have to sign a particular form
    - also mean that the forms templates themselves would have to carry that data possibly
1. **schemas/User.js**
    - Determine what new attributes we might have to add to make the signatures go to the right people


### Completed Tasks
1. **Home/Warning.jsx**
    - Determine logic for when the warning sign is shown
        - time based
        - 1/2/3 days?
        - doesnt show up if already signed
1. **Inbox/Inbox.jsx**
    - Make it so only the necessary messages show up

