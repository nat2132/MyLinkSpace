<?php 
namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PerformanceNotification extends Notification
{
    use Queueable;

    protected $topLinks;
    protected $bottomLinks;

    public function __construct($topLinks, $bottomLinks)
    {
        $this->topLinks = $topLinks;
        $this->bottomLinks = $bottomLinks;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'top_links' => $this->topLinks,
            'bottom_links' => $this->bottomLinks,
        ];
    }
}