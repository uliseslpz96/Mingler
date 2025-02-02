using Microsoft.Maui.Controls;
using MobileApp.ViewModels;

namespace MobileApp.Views
{
    public partial class FeedPage : ContentPage
    {

        public FeedPage()
        {
            InitializeComponent();
            BindingContext = new FeedViewModel();
        }
    }
}