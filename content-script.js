import lightTheme from "./theme/light.scss";
import darkTheme from "./theme/dark.scss";

let isThemeApplied = false;

// remove inline styles so that we can override them in CSS
const removeInlineStyles = () =>
{
	// commment in 0.17
	document.querySelectorAll(".comments .comment.ml-1 div[id^=comment-]").forEach((commentNode) =>
	{
		commentNode.style.removeProperty("border-left-color");
	});

	// commment in 0.18
	document.querySelectorAll("ul.comments.border-top").forEach((commentThread) =>
	{
		commentThread.style.removeProperty("border-left-color");
	});

	// commment in 0.18 (user profile)
	document.querySelectorAll(".person-details ul.comments").forEach((commentThread) =>
	{
		commentThread.style.removeProperty("border-left-color");
	});
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

	const themeStyles = isLightTheme ? lightTheme : darkTheme;

	const style = document.createElement("STYLE");
	style.innerText = themeStyles;
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
	const observer = new MutationObserver(removeInlineStyles);
	observer.observe(document.body, { childList: true, subtree: true });

	removeInlineStyles(); // run on initial page load
	isThemeApplied = true;
};

main();