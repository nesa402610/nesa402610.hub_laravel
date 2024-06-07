<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\HManga
 *
 * @property int $id
 * @property string|null $title_ru
 * @property string|null $title_en
 * @property string $title_original
 * @property string|null $description
 * @property string|null $description_short
 * @property int $censure
 * @property string|null $image
 * @property int $coloured
 * @property string $language
 * @property string $announce_date
 * @property string $release_date
 * @property int|null $author
 * @property int|null $anime
 * @property string|null $review
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|HManga newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HManga newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HManga query()
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereAnime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereAnnounceDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereAuthor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereCensure($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereColoured($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereDescriptionShort($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereReleaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereReview($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereTitleEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereTitleOriginal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereTitleRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereUpdatedAt($value)
 * @property int $episode_time
 * @property int $episodes_released
 * @property int $episodes_total
 * @property string|null $origins
 * @property int $type
 * @property string $rating
 * @property int $colored
 * @property string $style
 * @property int $totalPages
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereColored($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereEpisodeTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereEpisodesReleased($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereEpisodesTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereOrigins($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereStyle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereTotalPages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereType($value)
 * @property string $kind
 * @property float|null $shiki_score
 * @property int $shiki_id
 * @property int $mal_id
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereKind($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereMalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereShikiId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HManga whereShikiScore($value)
 * @mixin \Eloquent
 */
class HManga extends Model {
    use HasFactory;
    protected $table = 'h_collections';

//    public function pages() {
//        $pages = $this->hasMany(hmangapages::class, 'manga_id');
//    }
}
