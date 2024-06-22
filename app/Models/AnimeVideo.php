<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\HLinks
 *
 * @property int $id
 * @property string $link
 * @property string $platform
 * @property int $episode
 * @property int $iframe
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeVideo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeVideo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeVideo query()
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeVideo whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeVideo whereEpisode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeVideo whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeVideo whereIframe($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeVideo whereLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeVideo wherePlatform($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeVideo whereUpdatedAt($value)
 * @property int $anime_id
 * @property string|null $team
 * @property string|null $player
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeVideo whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeVideo wherePlayer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeVideo whereTeam($value)
 * @mixin \Eloquent
 */
class AnimeVideo extends Model
{
    protected $table = 'anime_video';
    use HasFactory;

    public function anime()
    {
        return $this->belongsTo(Anime::class);
    }
}
