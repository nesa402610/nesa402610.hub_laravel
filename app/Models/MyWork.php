<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

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
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $github
 * @property-read Collection|\App\Models\MyWorkScore[] $rates
 * @property-read int|null $rates_count
 * @method static Builder|MyWork newModelQuery()
 * @method static Builder|MyWork newQuery()
 * @method static Builder|MyWork query()
 * @method static Builder|MyWork whereCreatedAt($value)
 * @method static Builder|MyWork whereFramework($value)
 * @method static Builder|MyWork whereGithub($value)
 * @method static Builder|MyWork whereHost($value)
 * @method static Builder|MyWork whereId($value)
 * @method static Builder|MyWork whereImage($value)
 * @method static Builder|MyWork whereLevel($value)
 * @method static Builder|MyWork whereName($value)
 * @method static Builder|MyWork wherePreviewURL($value)
 * @method static Builder|MyWork whereSource($value)
 * @method static Builder|MyWork whereSourceURL($value)
 * @method static Builder|MyWork whereStack($value)
 * @method static Builder|MyWork whereStatus($value)
 * @method static Builder|MyWork whereUpdatedAt($value)
 * @property string|null $source_name
 * @property string|null $source_url
 * @property string|null $preview_url
 * @property-read mixed $score
 * @method static Builder|MyWork whereSourceName($value)
 * @mixin Eloquent
 */
class MyWork extends Model
{
    use HasFactory;

    protected $appends = ['score'];

    public function rates()
    {
        return $this->hasMany(MyWorkScore::class, 'work_id');
    }

    public function getScoreAttribute()
    {
        $count = $this->rates()->count();
        $sum = $this->rates()->sum('score');
        if ($count) {
            return ($sum / $count);
        } else return null;
    }
}
