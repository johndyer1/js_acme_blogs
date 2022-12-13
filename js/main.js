/*
1. createElemWithText
	a. Receives up to 3 parameters
    b. 1st parameter is the HTML element string name to be created (h1, p, button, etc)
    c. Set a default value for the 1st parameter to “p”
    d. 2nd parameter is the textContent of the element to be created
    e. Default value of the 2nd parameter is “”
    f. 3rd parameter is a className if one is to be applied (optional)
    g. Use document.createElement() to create the requested HTML element
    h. Set the other desired element attributes.
    i. Return the created element.
*/
const createElemWithText = (elem = "p", newTextContent = "", className = "") => {
	//Create new HTML element
	let newElem = document.createElement(elem);
	//Add text contentt to new HTML element
	newElem.textContent = newTextContent;
	//Apply class name to new element
	newElem.className = className
	//Return new element
	return newElem;
}


/*
2. createSelectOptions
	a. Test users JSON data available here: https://jsonplaceholder.typicode.com/users
	b. For testing (not in function) you may want to define users with the test data.
	c. Receives users JSON data as a parameter
	d. Returns undefined if no parameter received
	e. Loops through the users data
	f. Creates an option element for each user with document.createElement()
	g. Assigns the user.id to the option.value
	h. Assigns the user.name to the option.textContent
	i. Return an array of options elements
*/
const createSelectOptions = (users) => {
	//Tests if user parameter is received and returns undefined if not
	if (!users) 
		return;
	
	//User parameter in array is returned
	//Creates a new array with results of every user's id and name put into "options" element from the users objects
	return users.map ((user) => {
		let options = document.createElement("option");
		//Define elements of options 
		options.value = user.id;
		options.textContent = user.name;
		return options;
    });
};


/*
3. toggleCommentSection
	a. Receives a postId as the parameter
	b. Selects the section element with the data-post-id attribute equal to the postId
	received as a parameter
	c. Use code to verify the section exists before attempting to access the classList
	property
	d. At this point in your code, the section will not exist. You can create one to test if
	desired.
	e. Toggles the class 'hide' on the section element
	f. Return the section element
*/
const toggleCommentSection = (postId) => {
	//Checks if postId parameter is undefined and returns
	if (!postId)
		return;
	//Selects section element with data-post-id equal to postId parameter
	let section = document.querySelector(`section[data-post-id="${postId}"]`);
	//Verify if section exists
	if (section) 
		//Toggle classList to 'hide'
		section.classList.toggle('hide');
	return section;
}


/*
4. toggleCommentButton
	a. Receives a postId as the parameter
	b. Selects the button with the data-post-id attribute equal to the postId received as a
	parameter
	c. If the button textContent is 'Show Comments' switch textContent to 'Hide
	Comments'
	d. If the button textContent is 'Hide Comments' switch textContent to 'Show
	Comments'
	e. Suggestion (not required) for above: try a ternary statement
	f. Return the button element
*/
const toggleCommentButton = (postId) => {
	//Checks if postId parameter is undefined and returns
	if (!postId)
		return;
	//Selects button element with data-post-id equal to postId parameter
	let butt = document.querySelector(`button[data-post-id="${postId}"]`);
	//Runs conditional statements if button is selected 
	if (butt) {
		//Ternary switch statement depending on status of button
		butt.textContent === "Show Comments" ? (butt.textContent = "Hide Comments") : (butt.textContent = "Show Comments");
	}
	//Returns the button element
	return butt;
}


/*
5. deleteChildElements
	a. Receives a parentElement as a parameter
	b. Define a child variable as parentElement.lastElementChild
	c. While the child exists…(use a while loop)
	d. Use parentElement.removeChild to remove the child in the loop
	e. Reassign child to parentElement.lastElementChild in the loop
	f. Return the parentElement
*/
const deleteChildElements = (parentElement) => {
	//Checks if parentElement is an HTMLElement
	if (!(parentElement instanceof HTMLElement))
		return;
	//Defines a child variable
	let child = parentElement.lastElementChild;
	
	//While the child exists...
	while (child) {
		parentElement.removeChild(child);
		child = parentElement.lastElementChild;
	}
	//Returns parentElement parameter
	return parentElement;
}


/*
6. addButtonListeners
	a. Selects all buttons nested inside the main element
	b. If buttons exist:
	c. Loop through the NodeList of buttons
	d. Gets the postId from button.dataset.postId
	e. Adds a click event listener to each button (reference addEventListener)
	f. The listener calls an anonymous function (see cheatsheet)
	g. Inside the anonymous function: the function toggleComments is called with the
	event and postId as parameters
	h. Return the button elements which were selected
	i. You may want to define an empty toggleComments function for now. Not all tests
	will pass for addButtonListeners until toggleComments exists. I recommend
	waiting on the logic inside the toggleComments function until we get there.
*/
const addButtonListeners = () => {
	//Select all buttons from the "main button" element to create the new buttons NodeList object
	let buttons = document.querySelectorAll("main button");
	
	//Go through the buttons array and adds event listeners to each member using the forEach function
	buttons.forEach(butt => {
		//Add event listener for button where toggleComments is called every click 
		butt.addEventListener('click', () => {
			toggleComments(event, butt.dataset.postId);
		});
	});
	//Return the selected buttons
	return buttons;
}


/*
7. removeButtonListeners
	a. Selects all buttons nested inside the main element
	b. Loops through the NodeList of buttons
	c. Gets the postId from button.dataset.id
	d. Removes the click event listener from each button (reference
	removeEventListener)
	e. Refer to the addButtonListeners function as this should be nearly identical
	f. Return the button elements which were selected
*/
const removeButtonListeners = () => {
	//Select all buttons from the "main button" element to create the new buttons NodeList object
	let buttons = document.querySelectorAll("main button");
	
	//Go through the buttons array and removes event listeners for each member using the forEach function
	buttons.forEach(butt => {
		//Remove event listener for each button using the 'click' type and event listener
		butt.removeEventListener('click', event);
	});
	//Return the selected buttons
	return buttons;
}


/*
8. createComments
	a. Depends on the createElemWithText function we created
	b. Receives JSON comments data as a parameter
	c. Creates a fragment element with document.createDocumentFragment()
	d. Loop through the comments
	e. For each comment do the following:
	f. Create an article element with document.createElement()
	g. Create an h3 element with createElemWithText('h3', comment.name)
	h. Create an paragraph element with createElemWithText('p', comment.body)
	i. Create an paragraph element with createElemWithText('p', `From:
	${comment.email}`)
	j. Append the h3 and paragraphs to the article element (see cheatsheet)
	k. Append the article element to the fragment
	l. Return the fragment element
*/
const createComments = (jData) => {
	//Return undefined if parameter is empty
	if (!jData)
		return;
	//Create an empty document fragment element 
	let eDoc = document.createDocumentFragment();
	
	//Loop through the comments using the forEach function
	jData.forEach(comment => {
		//Create an article element
		let aElem = document.createElement('article');
		//Create h3 element
		const h3Elem = createElemWithText('h3', comment.name);
		//Create a paragraph element for the comment
		const pCommElem = createElemWithText('p', comment.body);
		//Create a paragrapgh elemt for the email
		const pEmailElem = createElemWithText('p', `From: ${comment.email}`);
		//Append the article elemt with the content
		aElem.appendChild(h3Elem);
		aElem.appendChild(pCommElem);
		aElem.appendChild(pEmailElem);
		//Append the article element to the fragment
		eDoc.appendChild(aElem);
	});
	return eDoc;
}


/*
9. populateSelectMenu
	a. Depends on the createSelectOptions function we created
	b. Receives the users JSON data as a parameter
	c. Selects the #selectMenu element by id
	d. Passes the users JSON data to createSelectOptions()
	e. Receives an array of option elements from createSelectOptions
	f. Loops through the options elements and appends each option element to the
	select menu
	g. Return the selectMenu element
*/
const populateSelectMenu = (jData) => {
	//Return undefined if parameter is empty
	if (!jData)
		return;
	//Select the #selectMenu by id
	let sMenu = document.querySelector("#selectMenu");
	//Create array of option elements from createSelectOptions function
	let oElems = createSelectOptions(jData);
	
	//Loop through options elements with forEach function and append them to the select menu
	oElems.forEach(option => {
		//Append sMenu with current option
		sMenu.append(option);
	});
	
	//Return the selectMenu 
	return sMenu;
}


/*
10. getUsers
	a. Fetches users data from: https://jsonplaceholder.typicode.com/ (look at
	Resources section)
	b. Should be an async function
	c. Should utilize a try / catch block
	d. Uses the fetch API to request all users
	e. Await the users data response
	f. Return the JSON data
*/
const getUsers = async() => {
	//Defines the URL
	const url = "https://jsonplaceholder.typicode.com/users";
	
	//Try to fetch the users data from the website 
	try {
		//Awaits for response from the website
		const response = await fetch(url);
		//Converts received data to JSON value and returns it
		return await response.json();
	}
	//Returns undefined if there is an error
	catch (e) {
		return;
	}
}


/*
11. getUserPosts
	a. Receives a user id as a parameter
	b. Fetches post data for a specific user id from:
	https://jsonplaceholder.typicode.com/ (look at Routes section)
	c. Should be an async function
	d. Should utilize a try / catch block
	e. Uses the fetch API to request all posts for a specific user id
	f. Await the users data response
	g. Return the JSON data
*/
const getUserPosts = async(userIdNum) => {
	//Returns undefined if no parameter is given
	if ((!userIdNum) || userIdNum === null)
		return;
	
	//Defines the URL
	const url = "https://jsonplaceholder.typicode.com/posts";
	//Array for post data to return 
	const userData = [];
	
	try {
		//Awaits for response from the website
		const response = await fetch(url);
		//Receives JSON data
		const jData = await response.json();
		//Filter out posts not from user ID using the forEach function
		jData.forEach(post => {
			if (post.userId === userIdNum)
				userData.push(post);
		});
		
		//Return the posts unique to that user
		return userData;
	}
	//Returns undefined if the try block does not work
	catch (e) {
		return;
	}
}


/*
12. getUser
	a. Receives a user id as a parameter
	b. Fetches data for a specific user id from: https://jsonplaceholder.typicode.com/
	(look at Routes section)
	c. Should be an async function
	d. Should utilize a try / catch block
	e. Uses the fetch API to request a specific user id
	f. Await the user data response
	g. Return the JSON data
*/
const getUser = async(userId) => {
	//Returns undefined if no parameter is given
	if ((!userId) || userId === null)
		return;
	
	//Defines the URL
	const url = "https://jsonplaceholder.typicode.com/users";
	
	try {
		//Awaits for response from the website
		const response = await fetch(url);
		//Receives JSON data
		const jData = await response.json();
		//Filter out posts not from user ID NOT using the forEach function since it doesn't work with async...
		for (const user of jData) {
			if (user.id === userId) 
				return user;
		}
	}
	//Returns undefined if the try block does not work
	catch (e) {
		return;
	}
}


/*
13. getPostComments
	a. Receives a post id as a parameter
	b. Fetches comments for a specific post id from:
	https://jsonplaceholder.typicode.com/ (look at Routes section)
	c. Should be an async function
	d. Should utilize a try / catch block
	e. Uses the fetch API to request all comments for a specific post id
	f. Await the users data response
	g. Return the JSON data
*/
const getPostComments = async(postIdS) => {
	//Returns undefined if no parameter is given
	if ((!postIdS) || postIdS === null)
		return;
	
	//Defines the URL
	const url = "https://jsonplaceholder.typicode.com/comments";
	//Array for post data to return 
	const userComms = [];
	
	try {
		//Awaits for response from the website
		const response = await fetch(url);
		//Receives JSON data
		const jData = await response.json();
		//Filter out posts not from user ID using the forEach function
		jData.forEach(comm => {
			if (comm.postId === postIdS)
				userComms.push(comm);
		});
		
		//Return the posts unique to that user
		return userComms;
	}
	//Returns undefined if the try block does not work
	catch (e) {
		return;
	}
}


/*
14. displayComments
	a. Dependencies: getPostComments, createComments
	b. Is an async function
	c. Receives a postId as a parameter
	d. Creates a section element with document.createElement()
	e. Sets an attribute on the section element with section.dataset.postId
	f. Adds the classes 'comments' and 'hide' to the section element
	g. Creates a variable comments equal to the result of await
	getPostComments(postId);
	h. Creates a variable named fragment equal to createComments(comments)
	i. Append the fragment to the section
	j. Return the section element
*/
const displayComments = async(postId) => {
	//Returns undefined if no parameter is given
	if ((!postId) || postId === null)
		return;
	
	//Create a section element
	let section = document.createElement('section');
	//Set an attribute on the section element
	section.dataset.postId = postId;
	//Add the two classes to the section element
	section.classList.add('comments');
	section.classList.add('hide');
	//Create a comments variable equal to the comments from postId
	let comments = await getPostComments(postId);
	//Create a fragment variable equal to createComments(comments);
	let fragment = createComments(comments);
	//Append the fragment to the section
	section.append(fragment);
	//Return the section element
	return section;
}


/*
15. createPosts
	a. Dependencies: createElemWithText, getUser, displayComments
	b. Is an async function
	c. Receives posts JSON data as a parameter
	d. Create a fragment element with document.createDocumentFragment()
	e. Loops through the posts data
	f. For each post do the following:
	g. Create an article element with document.createElement()
	h. Create an h2 element with the post title
	i. Create an p element with the post body
	j. Create another p element with text of `Post ID: ${post.id}`
	k. Define an author variable equal to the result of await getUser(post.userId)
	l. Create another p element with text of `Author: ${author.name} with
	${author.company.name}`
	m. Create another p element with the author’s company catch phrase.
	n. Create a button with the text 'Show Comments'
	o. Set an attribute on the button with button.dataset.postId = post.id
	p. Append the h2, paragraphs, button, and section elements you have created to
	the article element.
	q. Create a variable named section equal to the result of await
	displayComments(post.id);
	r. Append the section element to the article element
	s. After the loop completes, append the article element to the fragment
	t. Return the fragment element
*/
const createPosts = async(posts) => {
	//Returns undefined if no parameter is given
	if ((!posts) || posts === null)
		return;
	
	//Create fragment element
	let fragment = document.createDocumentFragment();
	
	//Loop through the posts data using for instead of forEach, because forEach does not work with async functions
	for (const post of posts) {
		let articleElem = document.createElement('article');
		const h2Elem = createElemWithText('h2', post.title);
		const p1Elem = createElemWithText('p', post.body);
		const p2Elem = createElemWithText('p', `Post ID: ${post.id}`);
		const author = await getUser(post.userId);
		const p3Elem = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
		const p4Elem = createElemWithText('p', author.company.catchPhrase);
		let butt = createElemWithText('button', 'Show Comments');
		butt.dataset.postId = post.id;
		articleElem.append(h2Elem, p1Elem, p2Elem, p3Elem, p4Elem, butt);
		const section = await displayComments(post.id);
		articleElem.append(section);
		fragment.append(articleElem);
	}
	
	return fragment;
}


/*
16. displayPosts
	a. Dependencies: createPosts, createElemWithText
	b. Is an async function
	c. Receives posts data as a parameter
	d. Selects the main element
	e. Defines a variable named element that is equal to:
	i. IF posts exist: the element returned from await createPosts(posts)
	ii. IF post data does not exist: create a paragraph element that is identical to
	the default paragraph found in the html file.
	iii. Optional suggestion: use a ternary for this conditional
	f. Appends the element to the main element
	g. Returns the element variable
*/
const displayPosts = async(posts) => {
	//Define main as the main element
	let main = document.querySelector('main');
	//Define element with a ternary statement
	const element = (posts) ? (await createPosts(posts)) : (document.querySelector('p'));
	//Append main with element
	main.append(element);
	
	//Return the element variable
	return element;
}


/*
17. toggleComments
	a. Dependencies: toggleCommentSection, toggleCommentButton
	b. Receives 2 parameters: (see addButtonListeners function description)
	i. The event from the click event listener is the 1st param
	ii. Receives a postId as the 2nd parameter
	c. Sets event.target.listener = true (I need this for testing to be accurate)
	d. Passes the postId parameter to toggleCommentSection()
	e. toggleCommentSection result is a section element
	f. Passes the postId parameter to toggleCommentButton()
	g. toggleCommentButton result is a button
	h. Return an array containing the section element returned from
	toggleCommentSection and the button element returned from
	toggleCommentButton: [section, button]
*/
const toggleComments = (eve, postId) => {
	//Check if parameters received and return undefined if not
	if (!eve || eve === null || !postId || postId === null) 
		return;
	
	//Set listener to true for testing
	eve.target.listener = true;
	//Gets section element from toggleCommentSection
	const sElem = toggleCommentSection(postId);
	//Gets button from toggleCommentButton
	const bElem = toggleCommentButton(postId);
	
	//Returns array
	return [sElem, bElem];
}


/*
18. refreshPosts
	a. Dependencies: removeButtonListeners, deleteChildElements, displayPosts,
	addButtonListeners
	b. Is an async function
	c. Receives posts JSON data as a parameter
	d. Call removeButtonListeners
	e. Result of removeButtonListeners is the buttons returned from this function
	f. Call deleteChildElements with the main element passed in as the parameter
	g. Result of deleteChildElements is the return of the main element
	h. Passes posts JSON data to displayPosts and awaits completion
	i. Result of displayPosts is a document fragment
	j. Call addButtonListeners
	k. Result of addButtonListeners is the buttons returned from this function
	l. Return an array of the results from the functions called: [removeButtons, main,
	fragment, addButtons]
*/
const refreshPosts = async(jData) => {
	//Returns undefined if no parameter is given
	if ((!jData) || jData === null)
		return;
	
	//Call removeButtonListeners and store buttons in butt
	const removeButtons = removeButtonListeners();
	//Receive main element after deleting child elements
	const main = deleteChildElements(document.querySelector('main'));
	//Receive document fragment from displayPosts and store in fragment
	const fragment = await displayPosts(jData);
	//Store buttons from addButtonListeners
	const addButtons = addButtonListeners();
	
	//Return array
	return [removeButtons, main, fragment, addButtons];
}


/*
19. selectMenuChangeEventHandler
	a. Dependencies: getUserPosts, refreshPosts
	b. Should be an async function
	c. Automatically receives the event as a parameter (see cheatsheet)
	d. Disables the select menu when called into action (disabled property)
	e. Defines userId = event.target.value || 1; (see cheatsheet)
	f. Passes the userId parameter to await getUserPosts
	g. Result is the posts JSON data
	h. Passes the posts JSON data to await refreshPosts
	i. Result is the refreshPostsArray
	j. Enables the select menu after results are received (disabled property)
	k. Return an array with the userId, posts and the array returned from refreshPosts:
	[userId, posts, refreshPostsArray]
*/
const selectMenuChangeEventHandler = async(eve) => {
	//Returns undefined if no parameter
	if (!eve || eve === null)
		return;
	
	//Define userId
	const userId = (eve.target.value) || 1;
	//Get posts data from getUserPosts
	const posts = await getUserPosts(userId);
	//Get refreshPostsArray from refreshPosts function
	const refreshPostsArray = await refreshPosts(posts);
	
	//Return array
	return [userId, posts, refreshPostsArray];
}


/*
20. initPage
	a. Dependencies: getUsers, populateSelectMenu
	b. Should be an async function
	c. No parameters.
	d. Call await getUsers
	e. Result is the users JSON data
	f. Passes the users JSON data to the populateSelectMenu function
	g. Result is the select element returned from populateSelectMenu
	h. Return an array with users JSON data from getUsers and the select element
	result from populateSelectMenu: [users, select]
*/
const initPage = async() => {
	//Store user JSON data from getUsers function
	const users = getUsers();
	//Store select element from populateSelectMenu function
	const select = populateSelectMenu(users);
	
	//Return array
	return [users, select];
}


/*
21. initApp
	a. Dependencies: initPage, selectMenuChangeEventHandler
	b. Call the initPage() function.
	c. Select the #selectMenu element by id
	d. Add an event listener to the #selectMenu for the “change” event
	e. The event listener should call selectMenuChangeEventHandler when the change
	event fires for the #selectMenu
	f. NOTE: All of the above needs to be correct for you app to function correctly.
	However, I can only test if the initApp function exists. It does not return anything.
*/
const initApp = () => {
	//Call initPage function
	initPage();
	//Select element and store in variable
	const select = document.getElementById('#selectMenu');
	//Add event listener to select
	select.addEventListener('change', selectMenuChangeEventHandler());
}

document.addEventListener("DOMContentLoaded", initApp());
