<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class hmangapages extends Model {
    use HasFactory;

    public function manga() {
        return $this->belongsTo(HManga::class);
    }
}