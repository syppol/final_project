import { decode } from "html-entities";

const getFirstImageUrl = (decodedContent) => {
        const regex = /<img src="(.*?)"/m;
        const match = decodedContent.match(regex);
        return match ? match[1] : null;
};

const decodeContent = (markup) => {
        return decode(markup);
};

const removeAllTags = (content) => {
        const regex = /<.*?>/g;
        return content.replace(regex, " ");
};

export const getImg = (markup) => {
        const decodedContent = decodeContent(markup);
        const img = getFirstImageUrl(decodedContent);

        return img;
};

export const getText = (markup) => {
        const decodedContent = decodeContent(markup);
        const truncatedContent = removeAllTags(decodedContent).slice(0, 700) + "…";

        return {
                content: truncatedContent,
        };
};

