import React from 'react';
import ReactPlayer from 'react-player';

interface VideoBackgroundProps {
  children: React.ReactNode;
  videoUrl?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  children, 
  videoUrl = 'https://www.youtube.com/watch?v=hhYQ_X5C0mk'
}) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <ReactPlayer
            url={videoUrl}
            playing
            loop
            muted
            width="100%"
            height="100%"
            className="react-player"
            playsinline
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              overflow: 'hidden'
            }}
            config={{
              youtube: {
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  showinfo: 0,
                  rel: 0,
                  modestbranding: 1,
                  iv_load_policy: 3,
                  playsinline: 1,
                  loop: 1,
                  mute: 1,
                  playlist: videoUrl.split('v=')[1]
                },
              },
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
        </div>
      </div>
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;