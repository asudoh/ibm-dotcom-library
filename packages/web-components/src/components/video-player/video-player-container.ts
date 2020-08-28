/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import { forEach } from '../../globals/internal/collection-helpers';
import VideoData from './video-data';
import './video-player';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Container component for video player.
 *
 * @element dds-video-player-container
 */
@customElement(`${ddsPrefix}-video-player-container`)
class DDSVideoPlayerContainer extends HybridRenderMixin(LitElement) {
  /**
   * The video data, keyed by the video ID.
   */
  protected _videoData: { [videoId: string]: VideoData } = {};

  /**
   * The requests for the video data, keyed by the video ID.
   */
  protected _requestsVideoData: { [videoId: string]: Promise<VideoData> } = {};

  /**
   * The embedded Kaltura player element (that has `.sendNotification()`, etc. APIs), keyed by the video ID.
   */
  protected _embeddedVideos: { [videoId: string]: any } = {};

  /**
   * The request for the embedded Kaltura player element (that has `.sendNotification()`, etc. APIs), keyed by the video ID.
   */
  protected _requestsEmbedVideo: { [videoId: string]: Promise<any> } = {};

  /**
   * Sets the state that the REST call for video data for the given video ID is in progress.
   *
   * @param videoId The video ID.
   * @param request The promise of the REST call for video data of the given video ID that is in progress.
   */
  private _setRequestVideoDataInProgress(videoId: string, request: Promise<VideoData>) {
    const { _requestsVideoData: oldRequestsVideoData } = this;
    this._requestsVideoData = {
      ...oldRequestsVideoData,
      [videoId]: request,
    };
    this.requestUpdate('_requestsVideoData', oldRequestsVideoData);
  }

  /**
   * Set the state that the REST call for video data for the given video ID is failed.
   *
   * @param videoId The video ID.
   * @param error An error from the REST call for video data of the given video ID.
   */
  private _setErrorRequestVideoData(videoId: string, error: Error) {
    this._setRequestVideoDataInProgress(videoId, Promise.reject(error));
  }

  /**
   * Sets the given video data for the given video ID.
   *
   * @param videoId The video ID.
   * @param data The video data.
   */
  private _setVideoData(videoId: string, data: VideoData) {
    this._setRequestVideoDataInProgress(videoId, Promise.resolve(data));
    const { _videoData: oldVideoData } = this;
    this._videoData = {
      ...oldVideoData,
      [videoId]: data,
    };
    this.requestUpdate('_videoData', oldVideoData);
  }

  /**
   * Sets the state that the API call for embedding the video for the given video ID is in progress.
   *
   * @param videoId The video ID.
   * @param request The promise of the API call for embedding the video of the given video ID that is in progress.
   */
  private _setRequestEmbedVideoInProgress(videoId: string, request: Promise<any>) {
    const { _requestsEmbedVideo: oldRequestsEmbedVideo } = this;
    this._requestsEmbedVideo = {
      ...oldRequestsEmbedVideo,
      [videoId]: request,
    };
    this.requestUpdate('_requestsEmbedVideo', oldRequestsEmbedVideo);
  }

  /**
   * Set the state that the API call for embedding the video for the given video ID is failed.
   *
   * @param videoId The video ID.
   * @param error An error from the API call for embedding the video of the given video ID.
   */
  private _setErrorRequestEmbedVideo(videoId: string, error: Error) {
    this._setRequestEmbedVideoInProgress(videoId, Promise.reject(error));
  }

  /**
   * Sets the given embedded Kaltura player element (that has `.sendNotification()`, etc. APIs) for the given video ID.
   *
   * @param videoId The video ID.
   * @param kWidget The embedded Kaltura player element (that has `.sendNotification()`, etc. APIs).
   */
  private _setEmbeddedVideo(videoId: string, kWidget: any) {
    this._setRequestEmbedVideoInProgress(videoId, Promise.resolve(kWidget));
    const { _embeddedVideos: oldEmbeddedVideos } = this;
    this._embeddedVideos = {
      ...oldEmbeddedVideos,
      [videoId]: kWidget,
    };
    this.requestUpdate('_embeddedVideos', oldEmbeddedVideos);
  }

  /**
   * Sends the REST call for video data for the given video ID, and tracks the progress and the error of the REST call.
   *
   * @param videoId The video ID.
   */
  private async _loadVideoData(videoId: string) {
    const { _requestsVideoData: requestsVideoData } = this;
    const requestVideoData = requestsVideoData[videoId];
    if (requestVideoData) {
      return requestVideoData;
    }
    const promiseVideoData = VideoPlayerAPI.api(videoId);
    this._setRequestVideoDataInProgress(videoId, promiseVideoData);
    try {
      this._setVideoData(videoId, await promiseVideoData);
    } catch (error) {
      this._setErrorRequestVideoData(videoId, error);
    }
    return promiseVideoData;
  }

  /**
   * Sets up and sends the API call for embedding video for the given video ID.
   *
   * @param videoId The video ID.
   */
  private async _embedVideoImpl(videoId: string) {
    const { selectorVideoPlayer } = this.constructor as typeof DDSVideoPlayerContainer;
    const { ownerDocument: doc } = this;
    // Given Kaltura replaces the `<div>` here with `<iframe>` with the video player,
    // rendering this `<div>` in `renderLightDOM()` will cause the video player being clobbered
    const playerId = Math.random()
      .toString(36)
      .slice(2);
    const div = doc!.createElement('div');
    div.id = playerId;
    div.className = `${prefix}--video-player__video`;
    const target = this.querySelector(selectorVideoPlayer);
    if (!target) {
      throw new TypeError('Cannot find the video player component to put the video content into.');
    }
    target.appendChild(div);
    const embedVideoHandle = await VideoPlayerAPI.embedVideo(videoId, playerId, true);
    doc.getElementById(playerId)!.dataset.videoId = videoId;
    return embedVideoHandle.kWidget();
  }

  /**
   * Sends the API call for embedding video for the given video ID, and tracks the progress and the error of the REST call.
   *
   * @param videoId The video ID.
   */
  private async _embedVideo(videoId: string) {
    const { _requestsEmbedVideo: requestsEmbedVideo } = this;
    const requestEmbedVideo = requestsEmbedVideo[videoId];
    if (requestEmbedVideo) {
      return requestEmbedVideo;
    }
    const promiseEmbedVideo = this._embedVideoImpl(videoId);
    this._setRequestEmbedVideoInProgress(videoId, promiseEmbedVideo);
    try {
      this._setEmbeddedVideo(videoId, await promiseEmbedVideo);
    } catch (error) {
      this._setErrorRequestEmbedVideo(videoId, error);
    }
    return promiseEmbedVideo;
  }

  /**
   * Activate the DOM nodes for the embedded video of the given video ID, and deactivates others.
   *
   * @param videoId The video ID to activate.
   */
  private _activateEmbeddedVideo(videoId: string) {
    const { selectorEmbeddedVideoContainer } = this.constructor as typeof DDSVideoPlayerContainer;
    const { _embeddedVideos: embeddedVideos } = this;
    Object.keys(embeddedVideos)
      .filter(key => key !== videoId)
      .forEach(key => {
        embeddedVideos[key].sendNotification('doStop');
      });
    forEach(this.querySelectorAll(selectorEmbeddedVideoContainer), element => {
      element.toggleAttribute('hidden', (element as HTMLElement).dataset.videoId !== videoId);
    });
  }

  /**
   * The formatter for the video caption, composed with the video name and the video duration.
   * Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatCaption?: ({ duration, name }: { duration: number; name: string }) => string;

  /**
   * `true` to hide the caption.
   */
  @property({ type: Boolean, attribute: 'hide-caption' })
  hideCaption = false;

  /**
   * The video ID.
   */
  @property({ attribute: 'video-id' })
  videoId = '';

  updated(changedProperties) {
    if (changedProperties.has('videoId')) {
      const { videoId } = this;
      this._activateEmbeddedVideo(videoId);
      if (videoId) {
        this._loadVideoData(videoId);
        this._embedVideo(videoId);
      }
    }
    return true;
  }

  renderLightDOM() {
    const { formatCaption, hideCaption, videoId, _videoData: videoData } = this;
    const { [videoId]: currentVideoData = {} as VideoData } = videoData;
    const { duration, name } = currentVideoData;
    return html`
      <dds-video-player
        duration="${ifNonNull(duration)}"
        ?hide-caption=${hideCaption}
        name="${ifNonNull(name)}"
        .formatCaption="${ifNonNull(formatCaption)}"
      >
      </dds-video-player>
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  /**
   * A selector selecting the video player component.
   */
  static get selectorVideoPlayer() {
    return `${ddsPrefix}-video-player`;
  }

  /**
   * A selector selecting the container DOM elements for embedding video.
   */
  static get selectorEmbeddedVideoContainer() {
    return '[data-video-id]';
  }
}

export default DDSVideoPlayerContainer;
