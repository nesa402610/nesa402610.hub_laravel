<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Certificates
 *
 * @property int $id
 * @property string $name
 * @property string $author
 * @property string $sign
 * @property string $date
 * @property string $image
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Certificates newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Certificates newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Certificates query()
 * @method static \Illuminate\Database\Eloquent\Builder|Certificates whereAuthor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificates whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificates whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificates whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificates whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificates whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificates whereSign($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Certificates whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Certificates extends Model
{
    use HasFactory;
}
