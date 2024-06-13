<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Rating
 *
 * @property int $id
 * @property int $project_id
 * @property int|null $user_id
 * @property int $rating
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\MyWork $project
 * @method static \Illuminate\Database\Eloquent\Builder|MyWorkScore newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MyWorkScore newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MyWorkScore query()
 * @method static \Illuminate\Database\Eloquent\Builder|MyWorkScore whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MyWorkScore whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MyWorkScore whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MyWorkScore whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MyWorkScore whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MyWorkScore whereUserId($value)
 * @property int $work_id
 * @property int $score
 * @method static \Illuminate\Database\Eloquent\Builder|MyWorkScore whereScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MyWorkScore whereWorkId($value)
 * @mixin \Eloquent
 */
class MyWorkScore extends Model
{
    use HasFactory;

    protected $table = 'work_score';
    public function project()
    {
        return $this->belongsTo(MyWork::class);
    }

}
