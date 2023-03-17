<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Suggestion
 *
 * @property int $id
 * @property int $author
 * @property string $title
 * @property string $body
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Suggestion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Suggestion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Suggestion query()
 * @method static \Illuminate\Database\Eloquent\Builder|Suggestion whereAuthor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Suggestion whereBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Suggestion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Suggestion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Suggestion whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Suggestion whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Suggestion whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Suggestion extends Model
{
    use HasFactory;

    public function user() {
        return $this->belongsTo(User::class, 'author')->select('name', 'lastName');
    }
}
