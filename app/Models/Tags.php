<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Collection\Collection;

/**
 * App\Models\Tags
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Tags newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tags newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tags query()
 * @method static \Illuminate\Database\Eloquent\Builder|Tags whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tags whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tags whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tags whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Tags extends Model
{
    use HasFactory;

//    public function collections() {
//        return $this->belongsToMany(HCollectionCard::class, 'tag_collection', 'tag_id');
//    }
}
