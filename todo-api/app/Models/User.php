<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Les attributs qu'on peut remplir en masse.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * Les attributs cachés pour les tableaux/JSON.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Casts des champs de la base de données.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Relation : un utilisateur possède plusieurs todos.
     */
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
