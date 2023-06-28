const path = require("path");
const fs = require("fs");
const { autoTheme, autoThemeHeader } = require("./auto-theme-template");
const LEMMY_DEFAULT_LIGHT_THEME_FILE_NAME = "litely.css";
const LEMMY_DEFAULT_DARK_THEME_FILE_NAME = "darkly.css";

const manifest = fs.readFileSync("./manifest.json");
const THEME_VERSION = JSON.parse(manifest).version;
const VERSION_CSS_COMMENT = `/* Modern UI Theme ${THEME_VERSION} */`;
const OUTPUT_FILE_PREFIX = `modern-`;

const readFileAsync = async (filePath) =>
{
	return new Promise((resolve, reject) =>
	{
		fs.readFile(filePath, (err, data) =>
		{
			if (err)
				reject(err);

			resolve(data);
		});
	});
};

const themeHeader = (string, importUrls) =>
{
	const importsString = importUrls.map(url => `@import url("${url}");\n`) + "\n";

	return VERSION_CSS_COMMENT + "\n\n" + importsString + string;
};

// builds a single theme
const buildTheme = async (fileNames, importUrls, outputFileName) =>
{
	const promises = fileNames.map((fileName) => readFileAsync(path.resolve("./dist", fileName)));

	try
	{
		const files = await Promise.all(promises);
		const mergedFiles = files.join("\n");
		const theme = themeHeader(mergedFiles, importUrls);

		fs.writeFile(path.resolve("./dist", outputFileName), theme, (err) =>
		{
			if (err)
				console.error("Couldn't write file", err);
		});

	} catch (err)
	{
		console.error("Couldn't read files", err);
	}
};

// builds a theme that contains both light and dark theme with media queries
const buildAutoTheme = async (commonFileNames, lightThemeFileName, darkThemeFileName, outputFileName) =>
{
	const promises = commonFileNames.map((fileName) => readFileAsync(path.resolve("./dist", fileName)));

	try
	{
		const commonFiles = await Promise.all(promises);
		const lightThemeContent = await readFileAsync(path.resolve("./dist", lightThemeFileName));
		const darkThemeContent = await readFileAsync(path.resolve("./dist", darkThemeFileName));

		const header = autoThemeHeader(VERSION_CSS_COMMENT, LEMMY_DEFAULT_LIGHT_THEME_FILE_NAME, LEMMY_DEFAULT_DARK_THEME_FILE_NAME);
		const theme = autoTheme(header, commonFiles.join("\n"), lightThemeContent, darkThemeContent);

		fs.writeFile(path.resolve("./dist", outputFileName), theme, (err) =>
		{
			if (err)
				console.error("Couldn't write file", err);
		});
	} catch (err)
	{
		console.error("Couldn't read files", err);
	}
};

buildTheme(
	["_common.css", "_light.css"],
	[LEMMY_DEFAULT_LIGHT_THEME_FILE_NAME],
	`${OUTPUT_FILE_PREFIX}light.css`
);

buildTheme(
	["_common.css", "_dark.css"],
	[LEMMY_DEFAULT_DARK_THEME_FILE_NAME],
	`${OUTPUT_FILE_PREFIX}dark.css`
);

buildAutoTheme(
	["_common.css"],
	"_light.css",
	"_dark.css",
	`${OUTPUT_FILE_PREFIX}auto.css`
);