import React from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';

const SocialSharing = ({ recipeTitle, recipeUrl, handleShare }) => {
  return (
    <div className="social-sharing">
      <h4>Share this recipe:</h4>
      <div>
        <FacebookShareButton url={recipeUrl} quote={recipeTitle} onClick={() => handleShare('Facebook')}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={recipeUrl} title={recipeTitle} onClick={() => handleShare('Twitter')}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={recipeUrl} title={recipeTitle} onClick={() => handleShare('Whatsapp')}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default SocialSharing;
