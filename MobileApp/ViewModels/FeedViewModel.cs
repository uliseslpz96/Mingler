using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobileApp.ViewModels
{
    public class FeedViewModel
    {
        public ObservableCollection<Post> Posts { get; set; }

        public FeedViewModel()
        {
            Posts = new ObservableCollection<Post>
            {
                new Post {
                    ImageUrl="https://scontent.fgdl2-2.fna.fbcdn.net/v/t1.6435-9/109853379_10223860021548132_1497104311959985383_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=bd9a62&_nc_eui2=AeHsjdV7JtA2OQfEf8k6sKCwgJwWhpl39BuAnBaGmXf0Gw27Q79YQ-LFAYP56en8YafeHk0h8eP1C12BhbrBaXyf&_nc_ohc=8AnT4sg15dAQ7kNvgFAz9lm&_nc_zt=23&_nc_ht=scontent.fgdl2-2.fna&_nc_gid=A5dFxmmrqi0Kutw-jxxP_iv&oh=00_AYDqZY2jkUJFwFnNWbU1T-aIW5yMc5ozwvGcneLXBmgrrg&oe=67B4FAE6",
                    Description="Primer publicación probando esta cosa extraña que aun no sé bien cómo funciona... creo que no sirve por lo menos no muy bien aun 😬 mientras miren dónde estoy 😎",
                    UserName="@anngellongoria",
                    UserProfileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScSYudO-aPedHJA5haPuHCRsVPg9aD4vozZw&s"
                },
                new Post {
                    ImageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGrcm_S5zxSjrZ02xc9Vfdu4kXivX4wGEXFA&s",
                    Description="Perdón las molestias... sigue en desarrollo 😅\r\n",
                    UserName="@iamlomau",
                    UserProfileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4XzPSLHeHIrfBjNwoli8dR16F2QmJ33fgew&s"
                },
                new Post {
                    ImageUrl="",
                    Description="El de arriba me la pela 🙊",
                    UserName="@luisgro.ibarra",
                    UserProfileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTer-Tc6WPY__b2wF9M4urGoVDRzR2Q63I0Dg&s"
                }
            };
        }

    }

    public class Post
    {
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public string UserName { get; set; }
        public string UserProfileImage { get; set; }
    }

}
