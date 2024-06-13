<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Tags
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Tag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tag newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tag query()
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereUpdatedAt($value)
 * @property int $type
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereType($value)
 * @property int $rx
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereRx($value)
 * @mixin \Eloquent
 */
class Tag extends Model
{
    use HasFactory;

//    public function collections() {
//        return $this->belongsToMany(AnimeCard::class, 'tag_collection', 'tag_id');
//    }
}
