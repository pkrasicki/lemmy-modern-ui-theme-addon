import commonStyles from "./theme/common.scss";
import lightTheme from "./theme/light.scss";
import darkTheme from "./theme/dark.scss";

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
		// this fixes a bug in Lemmy 0.19.5 where one of the stylesheets has href set to null, we just have to ignore it
		if (sheet.href == null)
			return false;

		const url = new URL(sheet.href);
		const themeNameRegex = /\/litely.*\.css$/;
		const isLitely = themeNameRegex.test(url.pathname);
		const mediaArray = [...sheet.media];
		const isActive = mediaArray.every((mediaString) => matchMedia(mediaString).matches);

		return isLitely && isActive;
	});

	const commonStyle = document.createElement("STYLE");
	commonStyle.innerText = commonStyles;
	document.body.prepend(commonStyle);

	const themeStyles = isLightTheme ? lightTheme : darkTheme;

	const style = document.createElement("STYLE");
	style.innerText = themeStyles;
	document.body.prepend(style);
};

const main = () =>
{
	const documentDescription = document.querySelector('meta[name="Description"]')?.content;
	const isLemmyInstance = documentDescription == "Lemmy";

	if (!isLemmyInstance)
		return;

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
};

main();