export = Queue;
/**
 * Represents a queue.
 */
declare class Queue extends Base {
    /**
    * Create a queue.
    * @param {DisTube} distube DisTube
    * @param {Discord.Message} message Discord.Message
    * @param {Song} song The first Song of the Queue
    */
    constructor(distube: DisTube, message: Discord.Message, song: Song);
    /**
     * `@3.0.0` Queue id (Guild id)
     * @type {Discord.Snowflake}
     */
    id: Discord.Snowflake;
    /**
     * Stream dispatcher.
     * @type {Discord.StreamDispatcher}
     */
    dispatcher: Discord.StreamDispatcher;
    /**
     * Voice connection.
     * @type {Discord.VoiceConnection}
     */
    connection: Discord.VoiceConnection;
    /**
     * Stream volume.
     * @type {number}
     */
    volume: number;
    /**
     * List of songs in the queue (The first one is the playing song)
     * @type {Song[]}
     */
    songs: Song[];
    /**
     * List of the previous songs.
     * @type {Song[]}
     */
    previousSongs: Song[];
    /**
     * Whether stream is currently stopped.
     * @type {boolean}
     */
    stopped: boolean;
    /**
     * Whether or not the last song was skipped to next song.
     * @type {boolean}
     */
    next: boolean;
    /**
     * Play the previous song
     * @returns {Queue} The guild queue
     * @throws {NoSong} if there is no previous song
     */
    previous(): Queue;
    /**
     * Whether or not the stream is currently playing.
     * @type {boolean}
     */
    playing: boolean;
    /**
     * Pause the guild stream
     * @returns {Queue} The guild queue
     */
    pause(): Queue;
    /**
     * Type of repeat mode (0 is disabled, 1 is repeating a song, 2 is repeating all the playlist)
     * @type {number}
     */
    repeatMode: number;
    /**
     * Whether or not the autoplay mode is enabled.
     * @type {boolean}
     */
    autoplay: boolean;
    /**
     * Enabled audio filters.
     * Available filters: {@link Filter}
     * @type {Filter[]}
     */
    filters: any[];
    /**
     * `@2.5.0` ytdl stream
     * @type {Readable}
     */
    stream: any;
    /**
     * `@2.7.0` What time in the song to begin (in milliseconds).
     * @type {number}
     */
    beginTime: number;
    /**
     * `@3.0.0` The text channel of the Queue. (Default: where the first command is called).
     * @type {Discord.TextChannel}
     */
    textChannel: Discord.TextChannel;
    /**
     * Formatted duration string.
     * @type {string}
     */
    get formattedDuration(): string;
    /**
     * Queue's duration.
     * @type {number}
     */
    get duration(): number;
    /**
     * `@2.7.0` What time in the song is playing (in milliseconds).
     * @type {number}
     */
    get currentTime(): number;
    /**
     * `@2.8.0` Formatted {@link Queue#currentTime} string.
     * @type {string}
     */
    get formattedCurrentTime(): string;
    /**
     * `@3.0.0` The voice channel playing in.
     * @type {Discord.VoiceChannel}
     */
    get voiceChannel(): Discord.VoiceChannel;
    /**
     * Add a Song or an array of Song to the queue
     * @param {Song|Song[]} song Song to add
     * @param {boolean} [unshift=false] Unshift?
     * @throws {Error} If an error encountered
     * @returns {Queue}
     */
    addToQueue(song: Song | Song[], unshift?: boolean): Queue;
    /**
     * Resume the guild stream
     * @returns {Queue} The guild queue
     */
    resume(): Queue;
    /**
     * Stop the guild stream
     */
    stop(): void;
    /**
     * Set the guild stream's volume
     * @param {number} percent The percentage of volume you want to set
     * @returns {Queue} The guild queue
     */
    setVolume(percent: number): Queue;
    /**
     * Skip the playing song
     * @returns {Queue} The guild queue
     * @throws {NoSong} if there is no song in queue
     */
    skip(): Queue;
    /**
     * Shuffle the queue's songs
     * @returns {Queue} The guild queue
     */
    shuffle(): Queue;
    /**
     * Jump to the song number in the queue.
     * The next one is 1, 2,...
     * The previous one is -1, -2,...
     * @param {number} num The song number to play
     * @returns {Queue} The guild queue
     * @throws {InvalidSong} if `num` is invalid number (0 < num < {@link Queue#songs}.length)
     */
    jump(num: number): Queue;
    /**
     * Set the repeat mode of the guild queue.
     * Turn off if repeat mode is the same value as new mode.
     * Toggle mode: `mode = null` `(0 -> 1 -> 2 -> 0...)`
     * @param {number?} [mode] The repeat modes `(0: disabled, 1: Repeat a song, 2: Repeat all the queue)`
     * @returns {number} The new repeat mode
     */
    setRepeatMode(mode?: number | null): number;
    /**
     * Enable or disable filter(s) of the queue.
     * Available filters: {@link Filter}
     * @param {Filter} filter A filter name
     * @returns {string} Current queue's filter name.
     * @throws {Error} If it's not a filter
     */
    setFilter(filter: any): string;
    /**
     * Set the playing time to another position
     * @param {number} time Time in milliseconds
     * @returns {Queue}
     * @example
     * client.on('message', message => {
     *     if (!message.content.startsWith(config.prefix)) return;
     *     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
     *     const command = args.shift();
     *     if (command = 'seek')
     *         distube.seek(message, Number(args[0]));
     * });
     */
    seek(time: number): Queue;
    /**
     * Add a related song to the queue
     * @async
     * @param {Song} [song] A song to get the related one
     * @returns {Promise<Queue>} The guild queue
     * @throws {NoRelated}
     */
    addRelatedVideo(song?: Song): Promise<Queue>;
}
import Base = require("./DisTubeBase");
import Discord = require("discord.js");
import Song = require("./Song");
import DisTube = require("./DisTube");
