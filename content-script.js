let isThemeApplied = false;

const themeStyles = (isLightTheme) => `
	${isLightTheme ? `
		:root
		{
			--custom-primary: #ce4500;
			--custom-secondary: #007d34;
			--custom-secondary-dark: #00a243;
			--custom-info: #0066d2;
			--custom-tabs-color: rgb(73, 80, 87);
			--custom-tabs-text-color: rgb(73, 80, 87);
			--custom-bg-color: #f4f4f4;
			--custom-main-bg-color: white;
			--custom-comment-left-border: rgba(0, 0, 0, 0.1);
		}
	` : `
		:root
		{
			--custom-primary: #49ce9d;
			--custom-tabs-color: rgb(49, 49, 49);
			--custom-tabs-text-color: #dee2e6;
			--custom-bg-color: #222;
			--custom-main-bg-color: #171717;
			--custom-comment-left-border: rgba(255, 255, 255, 0.1);
		}
	`}

	body
	{
		background-color: var(--custom-bg-color);
	}

	nav
	{
		background-color: var(--custom-main-bg-color);
	}

	main
	{
		padding-top: 10px;
	}

	.card
	{
		background-color: var(--custom-main-bg-color);
		border-color: transparent !important;
	}

	a
	{
		color: var(--custom-primary);
	}

	.text-primary
	{
		color: var(--custom-primary) !important;
	}

	.primary, .badge-primary, .btn-primary, .text-bg-primary
	{
		background-color: var(--custom-primary) !important;
		border-color: var(--custom-primary);
	}

	.btn-outline-primary
	{
		color: var(--custom-primary);
		border-color: var(--custom-primary);
	}


	${isLightTheme ? `
		.text-secondary
		{
			color: var(--custom-secondary) !important;
		}

		.secondary, .badge-secondary, .btn-secondary, .text-bg-secondary
		{
			background-color: var(--custom-secondary) !important;
			border-color: var(--custom-secondary);
		}

		.btn-outline-secondary
		{
			color: var(--custom-secondary);
			border-color: var(--custom-secondary);
		}

		.btn-outline-secondary:hover
		{
			background-color: var(--custom-secondary-dark);
			border-color: var(--custom-secondary-dark);
		}

		.text-info
		{
			color: var(--custom-info) !important;
		}
	` : `
		.btn-outline-secondary
		{
			color: var(--custom-tabs-text-color);
			border-color: rgb(130, 130, 130);
		}

		.btn-outline-secondary:hover
		{
			background-color: var(--custom-tabs-color);
			border-color: var(--custom-tabs-color);
		}
	`}


	.btn-group.btn-group-toggle .btn-outline-secondary:not(.active)
	{
		color: var(--custom-tabs-text-color);
		border-color: var(--custom-tabs-color);
	}

	.btn-group.btn-group-toggle .btn-outline-secondary:not(.active):hover
	{
		color: white;
		background-color: var(--custom-tabs-color);
	}

	.btn-group.btn-group-toggle .btn-outline-secondary.active
	{
		background-color: var(--custom-tabs-color);
		border-color: var(--custom-tabs-color);
	}

	.post-listing
	{
		padding-top: 12px;
	}

	/* form field */
	.form-control:focus
	{
		box-shadow: none;
	}

	/* community search dropdown in 0.17 */
	.custom-select:focus
	{
		box-shadow: none;
	}

	/* community search dropdown in 0.18 */
	.form-select:focus
	{
		box-shadow: none;
	}

	/* dropdown option */
	.choices__inner.bg-secondary, .choices__list .choices__item.bg-secondary
	{
		background: transparent !important;
	}
`;

const changeClasses = () =>
{
	// list of posts on the main page
	document.querySelector("main[role=main]:not(.card)")?.classList.add("card");

	// list of community posts in 0.18
	document.querySelector(".community .post-listings:not(.card)")?.classList.add("card");

	// sidebar buttons on main page
	document.querySelectorAll("aside .btn-secondary").forEach((button) =>
	{
		button.classList.remove("btn-secondary");
		button.classList.add("btn-outline-secondary");
	});

	// user post in 0.18
	const userPost = document.querySelector(".post .post-listing:first-child:not(.card)");
	userPost?.classList.add("card");
	userPost?.classList.remove("mt-2");

	// user profile in 0.18 - activity
	document.querySelector(".person-details:not(.card)")?.classList.add("card");

	// comments container (in user post and profile page)
	const commentsContainer = document.querySelector(".comments:first-child:not(.card)")?.parentElement;
	if (commentsContainer && !commentsContainer.classList.contains("card"))
	{
		commentsContainer.classList.add("card", "p-2");
	}

	// commment in 0.17 - indentation
	document.querySelectorAll(".comments .comment.ml-1").forEach((comment) =>
	{
		comment.classList.remove("ml-1");
		comment.classList.add("ml-2");

		// border
		const commentNode = comment.querySelector("div[id^=comment-]");
		commentNode?.classList?.remove("py-2");
		commentNode?.classList?.add("my-2");
		commentNode?.style?.setProperty("border-left-color", "var(--custom-comment-left-border)", "important");
	});

	// commment - margin in 0.18
	document.querySelectorAll(".post article[id^=comment-].py-2").forEach((comment) =>
	{
		comment.classList.remove("py-2");
		comment.classList.add("mb-4");
	});

	// commment - border in 0.18
	document.querySelectorAll("ul.comments.border-top").forEach((commentThread) =>
	{
		commentThread.classList.remove("border-top");

		// is nested
		if (commentThread.classList.contains("ms-1"))
		{
			commentThread.classList.remove("ms-1");
			commentThread.classList.add("ms-3");
		}

		commentThread.style.setProperty("border-left-color", "var(--custom-comment-left-border)", "important");
	});

	// commment (user profile) - border in 0.18
	document.querySelectorAll(".person-details ul.comments").forEach((commentThread) =>
	{
		commentThread.style.setProperty("border-left-color", "transparent", "important");
	});

	// communities - search in 0.18
	document.querySelector("main .search:not(.card)")?.classList.add("card");

	// communities - table
	document.querySelector("#community_table:not(.card)")?.classList.add("card", "d-table");

	// create post page
	document.querySelector(".container-lg .row .col-12.col-lg-6.offset-lg-3.mb-4:first-child:not(.card)")?.classList.add("card", "p-2");
};

const applyTheme = (styleSheetsArray) =>
{
	const isLightTheme = styleSheetsArray.some((sheet) =>
	{
		const url = new URL(sheet.href);
		const themeNameRegex = /\/litely.*\.css$/;
		const isLitely = themeNameRegex.test(url.pathname);
		const mediaArray = [...sheet.media];
		const isActive = mediaArray.every((mediaString) => matchMedia(mediaString).matches);

		return isLitely && isActive;
	});

	const style = document.createElement("STYLE");
	style.innerText = themeStyles(isLightTheme);
	document.body.prepend(style);
};

const main = () =>
{
	const styleSheetsArray = [...document.styleSheets];

	// if styles haven't loaded yet, wait a bit and try again
	if (styleSheetsArray.length == 0)
	{
		setTimeout(main, 100);
		return;
	}

	applyTheme(styleSheetsArray);

	// listen to document changes
	const observer = new MutationObserver(changeClasses);
	observer.observe(document.body, { childList: true, subtree: true });

	changeClasses(); // run on initial page load
	isThemeApplied = true;
};

main();