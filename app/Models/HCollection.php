<?php

namespace App\Models;

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
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection query()
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereAnnounceDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereAuthor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereCensure($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereDescriptionShort($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereEpisodeTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereEpisodesReleased($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereEpisodesTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereOrigins($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereReleaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereReview($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereStudio($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereTitleEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereTitleOriginal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereTitleRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HCollection whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class HCollection extends Model
{
    use HasFactory;
    public function studios() {
        return $this->belongsToMany(Studios::class, 'studio_collection', 'collection_id', 'studio_id');
    }
    public function tags() {
        return $this->belongsToMany(Tags::class, 'tag_collection', 'collection_id', 'tag_id')->select(['tag_id', 'name']);
    }
    public function links() {
        return $this->belongsToMany(HLinks::class, 'link_collection', 'collection_id', 'link_id');
    }
}
