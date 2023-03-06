<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Collection\Collection;

class Tags extends Model
{
    use HasFactory;

//    public function collections() {
//        return $this->belongsToMany(Collection::class, 'tag_collection', 'tag_id');
//    }
}
