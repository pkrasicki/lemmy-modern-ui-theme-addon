module.exports =
{
	autoThemeHeader: (versionComment, defaultLightThemeFileName, defaultDarkThemeFileName) =>
	{
		const importsString = `\
@import url("${defaultLightThemeFileName}") (prefers-color-scheme: light);
@import url("${defaultDarkThemeFileName}") (prefers-color-scheme: dark);`;

		return `\
${versionComment}

${importsString}`;
	},

	autoTheme: (header, commonContent, lightThemeContent, darkThemeContent) =>
	{
		return`\
${header}

${commonContent}

@media (prefers-color-scheme: light)
{
${lightThemeContent}
}

@media (prefers-color-scheme: dark)
{
${darkThemeContent}
}`;
	}
};