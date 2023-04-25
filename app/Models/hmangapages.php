<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\hmangapages
 *
 * @property int $id
 * @property int $manga_id
 * @property string $page_link
 * @property int $page_number
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\HManga $manga
 * @method static \Illuminate\Database\Eloquent\Builder|hmangapages newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|hmangapages newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|hmangapages query()
 * @method static \Illuminate\Database\Eloquent\Builder|hmangapages whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|hmangapages whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|hmangapages whereMangaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|hmangapages wherePageLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|hmangapages wherePageNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|hmangapages whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class hmangapages extends Model {
    use HasFactory;

    public function manga() {
        return $this->belongsTo(HManga::class);
    }
}
