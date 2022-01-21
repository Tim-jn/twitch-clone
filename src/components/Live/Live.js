import ReactTwitchEmbedVideo from 'react-twitch-embed-video'

export default function Live() {
  return (
    <div>
      <div className="container">
        <ReactTwitchEmbedVideo height="754" width="100%" channel="boxbox" />
      </div>
    </div>
  )
}
