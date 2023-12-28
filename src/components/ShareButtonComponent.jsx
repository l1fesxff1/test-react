import React from 'react';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, TelegramIcon, TelegramShareButton } from 'react-share';

const ShareButtonComponent = ({ data }) => {
    const shareUrl = `${window.location.origin}${data.path?.[0]?.alias}`;
    const title = data.title?.[0]?.value;

    return (
        <div className={'share-link'}>
            <FacebookShareButton url={shareUrl} quote={title}>
                <FacebookIcon size={35} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={35} round />
            </TwitterShareButton>
            <TelegramShareButton url={shareUrl} title={title}>
                <TelegramIcon size={35} round />
            </TelegramShareButton>
        </div>
    );
};

export default ShareButtonComponent;
