<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Passkey
 *
 * @property int $id
 * @property string $passkey
 * @property int|null $uses_left
 * @property string|null $expire_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Passkey newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Passkey newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Passkey query()
 * @method static \Illuminate\Database\Eloquent\Builder|Passkey whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Passkey whereExpireAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Passkey whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Passkey wherePasskey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Passkey whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Passkey whereUsesLeft($value)
 * @mixin \Eloquent
 */
class Passkey extends Model
{
    use HasFactory;
}
