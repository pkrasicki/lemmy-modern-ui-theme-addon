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
		}
	` : `
		:root
		{
			--custom-primary: #49ce9d;
			--custom-tabs-color: rgb(49, 49, 49);
			--custom-tabs-text-color: #dee2e6;
			--custom-bg-color: #222;
			--custom-main-bg-color: #171717;
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

	.primary, .badge-primary, .btn-primary
	{
		background-color: var(--custom-primary);
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

		.secondary, .badge-secondary, .btn-secondary
		{
			background-color: var(--custom-secondary);
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

	.comments
	{
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.form-control:focus
	{
		box-shadow: none;
	}

	/* dropdown */
	.choices__inner.bg-secondary, .choices__list .choices__item.bg-secondary
	{
		background: transparent !important;
	}
`;

const changeClasses = () =>
{
	// add class to the main section
	document.querySelector("main:not(.card)")?.classList.add("card");

	// change sidebar buttons
	document.querySelectorAll("aside .btn-secondary").forEach((button) =>
	{
		button.classList.remove("btn-secondary");
		button.classList.add("btn-outline-secondary");
	});

	// change the post
	document.querySelector(".post-listing:not(.card)")?.classList.add("card");

	// change comments
	document.querySelector(".comments:first-child:not(.card)")?.classList.add("card", "p-2");

	// change create post page
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