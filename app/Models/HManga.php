<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HManga extends Model {
    use HasFactory;

    public function pages() {
        return $this->hasMany(hmangapages::class, 'manga_id');
    }
}
