<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Project
 *
 * @property int $id
 * @property string $name
 * @property string|null $source
 * @property string|null $sourceURL
 * @property string|null $previewURL
 * @property string|null $image
 * @property string $status
 * @property int $level
 * @property string|null $framework
 * @property string|null $stack
 * @property string $host
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $github
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Rating[] $rates
 * @property-read int|null $rates_count
 * @method static \Illuminate\Database\Eloquent\Builder|Project newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Project newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Project query()
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereFramework($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereGithub($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereHost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project wherePreviewURL($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereSource($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereSourceURL($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereStack($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Project extends Model
{
    use HasFactory;
    public function rates() {
        return $this->hasMany(Rating::class);
    }
}
