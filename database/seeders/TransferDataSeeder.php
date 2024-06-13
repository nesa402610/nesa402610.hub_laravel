<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Seeder;

class TransferDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Установим соединение с первой базой данных
        $users = DB::connection('old_mysql')->table('users')->get();
        foreach ($users as $user) {
            // Переносим данные во вторую базу данных
            DB::connection('mysql')->table('users')->insert([
                'id' => $user->id,
                'name' => $user->name,
                'last_name' => $user->lastName,
                'middle_name' => $user->middleName,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'password' => $user->password,
                'birthday' => $user->birthday,
                'avatar' => null,
                'phone' => $user->phone,
                'status' => $user->status,
                'about' => $user->about,
                'verified' => false,
                'clown' => false,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ]);
        }
        DB::connection('mysql')->table('roles')->insert([
            'name' => 'Admin',
        ]);
        DB::connection('mysql')->table('user_role')->insert([
            'user_id' => 1,
            'role_id' => 1,
        ]);

        $myWorks = DB::connection('old_mysql')->table('projects')->get();
        foreach ($myWorks as $myWork) {
            // Переносим данные во вторую базу данных
            DB::connection('mysql')->table('my_works')->insert([
                'id' => $myWork->id,
                'name' => $myWork->name,
                'source_name' => $myWork->source,
                'source_url' => $myWork->sourceURL,
                'preview_url' => $myWork->previewURL,
                'image' => $myWork->image,
                'status' => $myWork->status,
                'level' => $myWork->level,
                'framework' => $myWork->framework,
                'stack' => $myWork->stack,
                'host' => $myWork->host,
                'created_at' => $myWork->created_at,
                'updated_at' => $myWork->updated_at,
            ]);
        }

        $myDocs = DB::connection('old_mysql')->table('certificates')->get();
        foreach ($myDocs as $myDoc) {
            // Переносим данные во вторую базу данных
            DB::connection('mysql')->table('my_docs')->insert([
                'name' => $myDoc->name,
                'author' => $myDoc->author,
                'sign' => $myDoc->sign,
                'date' => $myDoc->date,
                'image' => $myDoc->image,
            ]);
        }

        $myWorksScore = DB::connection('old_mysql')->table('ratings')->get();
        foreach ($myWorksScore as $score) {
            // Переносим данные во вторую базу данных
            DB::connection('mysql')->table('work_score')->insert([
                'work_id' => $score->project_id,
                'user_id' => $score->user_id,
                'score' => $score->rating,
            ]);
        }

        $news = DB::connection('old_mysql')->table('blog_posts')->get();
        foreach ($news as $new) {
            // Переносим данные во вторую базу данных
            DB::connection('mysql')->table('news')->insert([
                'id' => $new->id,
                'user_id' => $new->user_id,
                'title' => $new->title,
                'body' => $new->body,
                'visibility' => $new->visibility,
                'created_at' => $new->created_at,
                'updated_at' => $new->updated_at,
            ]);
        }

        $comments = DB::connection('old_mysql')->table('comments')->get();
        foreach ($comments as $comment) {
            // Переносим данные во вторую базу данных
            DB::connection('mysql')->table('comments')->insert([
                'id' => $comment->id,
                'user_id' => $comment->user_id,
                'news_id' => $comment->post_id,
                'anime_id' => null,
                'body' => $comment->body,
                'created_at' => $comment->created_at,
                'updated_at' => $comment->updated_at,
            ]);
        }

        $chat = DB::connection('old_mysql')->table('chats')->get();
        foreach ($chat as $item) {
            // Переносим данные во вторую базу данных
            DB::connection('mysql')->table('chat')->insert([
                'user_id' => $item->user_id,
                'body' => $item->message,
                'image' => null,
                'created_at' => $item->created_at,
                'updated_at' => $item->updated_at,
            ]);
        }

        $tasks = DB::connection('old_mysql')->table('suggestions')->get();
        foreach ($tasks as $task) {
            // Переносим данные во вторую базу данных
            DB::connection('mysql')->table('tasks')->insert([
                'author' => $task->author,
                'title' => $task->title,
                'body' => $task->body,
                'status' => $task->status,
                'priority' => 0,
                'votes' => 0,
                'created_at' => $task->created_at,
                'updated_at' => $task->updated_at,
            ]);
        }

        $anime = DB::connection('old_mysql')->table('h_collections')->get();
        foreach ($anime as $item) {
            // Переносим данные во вторую базу данных
            DB::connection('mysql')->table('animes')->insert([
                'id' => $item->id,
                'title_ru' => $item->title_ru,
                'title_en' => $item->title_en,
                'title_original' => $item->title_original,
                'description' => $item->description,
                'description_short' => $item->description_short,
                'censure' => $item->censure,
                'image' => $item->image,
                'announce_date' => $item->announce_date,
                'release_date' => $item->announce_date,
                'episode_time' => $item->episode_time,
                'episodes_released' => $item->episodes_released,
                'episodes_total' => $item->episodes_total,
                'kind' => $item->kind,
                'rating' => $item->rating,
                'style' => $item->style,
                'origins' => null,
                'author' => $item->author,
                'shiki_id' => $item->shiki_id,
                'mal_id' => $item->mal_id,
                'shiki_score' => $item->shiki_score,
            ]);
        }

        $links = DB::connection('old_mysql')->table('link_collection')->get();
        foreach ($links as $link) {
            $animeLink = DB::connection('old_mysql')->table('h_links')->where('id', $link->link_id)->first();
            // Переносим данные во вторую базу данных
            DB::connection('mysql')->table('anime_video')->insert([
                'anime_id' => $link->collection_id,
                'link' => $animeLink->link,
                'team' => null,
                'player' => $animeLink->platform,
                'episode' => $animeLink->episode,
                'iframe' => $animeLink->iframe,
            ]);
        }

        $animeUserStatus = DB::connection('old_mysql')->table('anime_user_status')->get();
        foreach ($animeUserStatus as $status) {
            $watchedEps = DB::connection('old_mysql')->table('watched_episodes')->where('collection_id', $status->anime_id)->first();
            $score = DB::connection('old_mysql')->table('collection_scores')->where('anime_id', $status->anime_id)->first();
            // Переносим данные во вторую базу данных
            DB::connection('mysql')->table('anime_user_status')->insert([
                'anime_id' => $status->anime_id,
                'user_id' => $status->user_id,
                'status' => $status->status,
                'watched_episodes' => $watchedEps->watched_episodes ?? null,
                'note' => null,
                'score' => $score->score ?? null,
                'favorite' => false,
            ]);
        }

        $genres = DB::connection('old_mysql')->table('tags')->get();
        foreach ($genres as $genre) {
            // Переносим данные во вторую базу данных
            DB::connection('mysql')->table('genres')->insert([
                'name' => $genre->name,
                'rx' => $genre->type
            ]);
        }
        $tags = DB::connection('old_mysql')->table('tags')->get();
        foreach ($tags as $tag) {
            // Переносим данные во вторую базу данных
            DB::connection('mysql')->table('tags')->insert([
                'name' => $tag->name,
                'rx' => $tag->type
            ]);
        }
        $animeTags = DB::connection('old_mysql')->table('collection_tags')->get();
        foreach ($animeTags as $tag) {
            // Переносим данные во вторую базу данных
            DB::connection('mysql')->table('anime_tag')->insert([
                'anime_id' => $tag->collection_id,
                'tag_id' => $tag->tag_id,
            ]);
        }
        $animeGenres = DB::connection('old_mysql')->table('tag_collection')->get();
        foreach ($animeGenres as $genre) {
            // Переносим данные во вторую базу данных
            DB::connection('mysql')->table('anime_genre')->insert([
                'anime_id' => $genre->collection_id,
                'genre_id' => $genre->tag_id,
            ]);
        }

    }
}
