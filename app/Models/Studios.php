<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Studios
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Studios newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Studios newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Studios query()
 * @method static \Illuminate\Database\Eloquent\Builder|Studios whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Studios whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Studios whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Studios whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Studios extends Model
{
    use HasFactory;
}
