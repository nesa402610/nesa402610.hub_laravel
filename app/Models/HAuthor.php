<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\HAuthor
 *
 * @property int $id
 * @property string $name Имя или никнейм
 * @property string $name_original
 * @property string|null $photo_link
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|HAuthor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HAuthor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HAuthor query()
 * @method static \Illuminate\Database\Eloquent\Builder|HAuthor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAuthor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAuthor whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAuthor whereNameOriginal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAuthor wherePhotoLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HAuthor whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class HAuthor extends Model
{
    use HasFactory;
}
