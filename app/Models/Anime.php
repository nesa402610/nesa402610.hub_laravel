<?php

namespace App\Models;

use Auth;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Anime
 *
 * @property int $id
 * @property string|null $title_ru
 * @property string|null $title_en
 * @property string $title_original
 * @property string|null $description
 * @property string|null $description_short
 * @property int $episode_time
 * @property int $censure
 * @property string|null $image
 * @property string $announce_date
 * @property string $release_date
 * @property int $episodes_released
 * @property int $episodes_total
 * @property string $studio
 * @property string|null $origins
 * @property string|null $author
 * @property string|null $review
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\AnimeVideo[] $links
 * @property-read int|null $links_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Tag[] $tags
 * @property-read int|null $tags_count
 * @method static \Illuminate\Database\Eloquent\Builder|Anime newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Anime newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Anime query()
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereAnnounceDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereAuthor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereCensure($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereDescriptionShort($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereEpisodeTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereEpisodesReleased($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereEpisodesTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereOrigins($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereReleaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereReview($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereStudio($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereTitleEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereTitleOriginal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereTitleRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereUpdatedAt($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Studios[] $studios
 * @property-read int|null $studios_count
 * @property int $type
 * @property string $rating
 * @property int $colored
 * @property string $style
 * @property int $totalPages
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereColored($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereStyle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereTotalPages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereType($value)
 * @property string $kind
 * @property float|null $shiki_score
 * @property int $shiki_id
 * @property int $mal_id
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Tag> $genres
 * @property-read int|null $genres_count
 * @property-read int $score
 * @property-read mixed $user_score
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereKind($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereMalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereShikiId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereShikiScore($value)
 * @property-read mixed $user_status
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AnimeVideo> $videos
 * @property-read int|null $videos_count
 * @mixin \Eloquent
 */
class Anime extends Model
{
    protected $appends = ['score', 'userStatus'];
    protected $fillable = ['status', 'watched_episodes'];


    use HasFactory;

//    public function studios()
//    {
//        return $this->belongsToMany(Studios::class, 'studio_collection', 'collection_id', 'studio_id');
//    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'anime_genre', 'anime_id', 'genre_id')->select(['genre_id', 'name']);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'anime_tag', 'anime_id', 'tag_id')->select(['tag_id', 'name']);
    }

    public function videos()
    {
        return $this->hasMany(AnimeVideo::class);
    }

    public function animeStatus()
    {
        if (!Auth::check()) return null;

        return $this->hasOne(AnimeUserStatus::class, 'anime_id')->where('user_id', Auth::user()->id);
    }

    public function getScores()
    {
        $scores = $this->animeStatus()->where('anime_id', $this->id)->pluck('score');
        return $scores->sum() ? $scores->sum() / $scores->count() : 0;
    }

//    public function getUserScore()
//    {
//        $userScore = AnimeScore::where('user_id', Auth::user()->id)->where('anime_id', $this->id)->value('score');
//        return $userScore;
//    }

//    public function userWatchedEpisodes()
//    {
//        return $this->hasOne(WatchedEpisode::class, 'collection_id');
//    }
//
//    public function watchedEpisodes()
//    {
//        $watched = DB::table('watched_episodes')->where('collection_id', $this->id)->where('user_id', Auth::user()->id)->value('watched_episodes');
//        return $watched;
//    }

//    public function getWatchedEpisodesAttribute()
//    {
//        return $this->watchedEpisodes();
//    }

    public function getScoreAttribute()
    {
        return round($this->getScores(), 2) * 2;
    }

    public function getUserStatusAttribute()
    {
        return $this->animeStatus()->first();
    }
}
