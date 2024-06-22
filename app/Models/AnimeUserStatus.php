<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\AnimeUserStatus
 *
 * @property int $id
 * @property int $anime_id
 * @property int $user_id
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeUserStatus newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeUserStatus newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeUserStatus query()
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeUserStatus whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeUserStatus whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeUserStatus whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeUserStatus whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeUserStatus whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeUserStatus whereUserId($value)
 * @property-read \App\Models\Anime $anime
 * @property int|null $watched_episodes
 * @property string|null $note
 * @property int|null $score
 * @property int $favorite
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeUserStatus whereFavorite($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeUserStatus whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeUserStatus whereScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AnimeUserStatus whereWatchedEpisodes($value)
 * @mixin \Eloquent
 */
class AnimeUserStatus extends Model
{
    use HasFactory;

    protected $table = 'anime_user_status';
    protected $fillable = ['status', 'watched_episodes'];


    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
        'user_id',
        'anime_id',
    ];

    public function anime()
    {
        return $this->belongsTo(Anime::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
