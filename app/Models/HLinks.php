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
 * @method static \Illuminate\Database\Eloquent\Builder|HLinks newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HLinks newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HLinks query()
 * @method static \Illuminate\Database\Eloquent\Builder|HLinks whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HLinks whereEpisode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HLinks whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HLinks whereIframe($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HLinks whereLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HLinks wherePlatform($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HLinks whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class HLinks extends Model
{
    use HasFactory;
}
