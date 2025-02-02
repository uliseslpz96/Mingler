using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CommunityToolkit.Mvvm.ComponentModel;

namespace MobileApp.ViewModels
{
    public class ProfileViewModel : ObservableObject
    {
        private string _userProfileImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4XzPSLHeHIrfBjNwoli8dR16F2QmJ33fgew&s"; // Imagen de perfil
        private string _userName = "Ulises López"; // Nombre del usuario
        private string _userHandle = "@iamlomau"; // Nombre de usuario tipo @usuario
        private string _userDescription = "Desarrollador móvil apasionado por .NET MAUI 🚀. Amante del código limpio y bien estructurado.";

        public string UserProfileImage
        {
            get => _userProfileImage;
            set => SetProperty(ref _userProfileImage, value);
        }

        public string UserName
        {
            get => _userName;
            set => SetProperty(ref _userName, value);
        }

        public string UserHandle
        {
            get => _userHandle;
            set => SetProperty(ref _userHandle, value);
        }

        public string UserDescription
        {
            get => _userDescription;
            set => SetProperty(ref _userDescription, value);
        }
    }
}
