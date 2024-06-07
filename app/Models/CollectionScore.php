<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\CollectionScore
 *
 * @property int $id
 * @property int $anime_id
 * @property int $user_id
 * @property int $score
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|CollectionScore newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CollectionScore newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CollectionScore query()
 * @method static \Illuminate\Database\Eloquent\Builder|CollectionScore whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CollectionScore whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CollectionScore whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CollectionScore whereScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CollectionScore whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CollectionScore whereUserId($value)
 * @mixin \Eloquent
 */
class CollectionScore extends Model
{
    use HasFactory;
}
