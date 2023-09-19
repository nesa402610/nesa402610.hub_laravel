<?php

namespace App\Models;

use Auth;
use DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\HAnime
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
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\HLinks[] $links
 * @property-read int|null $links_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Tags[] $tags
 * @property-read int|null $tags_count
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime query()
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereAnnounceDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereAuthor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereCensure($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereDescriptionShort($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereEpisodeTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereEpisodesReleased($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereEpisodesTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereOrigins($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereReleaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereReview($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereStudio($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereTitleEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereTitleOriginal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereTitleRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereUpdatedAt($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Studios[] $studios
 * @property-read int|null $studios_count
 * @property int $type
 * @property string $rating
 * @property int $colored
 * @property string $style
 * @property int $totalPages
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereColored($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereStyle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereTotalPages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAnime whereType($value)
 * @mixin \Eloquent
 */
class HAnime extends Model
{
    protected $table = 'h_collections';

    use HasFactory;

    public function studios()
    {
        return $this->belongsToMany(Studios::class, 'studio_collection', 'collection_id', 'studio_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tags::class, 'tag_collection', 'collection_id', 'tag_id')->select(['tag_id', 'name']);
    }

    public function links()
    {
        return $this->belongsToMany(HLinks::class, 'link_collection', 'collection_id', 'link_id');
    }

    public function animeStatus()
    {
        if (!Auth::check()) return null;

        return $this->hasOne(AnimeUserStatus::class, 'anime_id')->where('user_id', Auth::user()->id)->value('status');
    }

    public function ratings()
    {
        $ratings = DB::table('collection_ratings')->where('anime_id', $this->id)->pluck('rating');
        return $ratings->sum() / $ratings->count();
    }
}
