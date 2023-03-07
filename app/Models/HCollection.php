<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HCollection extends Model
{
    use HasFactory;

    public function tags() {
        return $this->belongsToMany(Tags::class, 'tag_collection', 'collection_id', 'tag_id')->select(['name']);
    }
    public function links() {
        return $this->hasMany(HLinks::class, 'collection_id')->select('link');
    }
}
