package actor

import (
	"context"
	"fmt"
	"strings"

	neurelo_sdk "github.com/neurelo-public/neurelo-sdk-examples/go-sdk"
	"github.com/neurelo-public/neurelo-sdk-examples/go/src/lib"
)

/* Actor Service */

func ReadAllActorSvc(req GetAllActorRequest) *[]neurelo_sdk.Actor {
    skip := (req.Page-1)*12
    take := 12
    trimmed_search := strings.TrimSpace(req.Search)

    first_name := neurelo_sdk.ActorWhereInputFirstName{}
    filter := neurelo_sdk.ActorWhereInput{}

    if (trimmed_search != "") {
        first_name.StringFilter = &neurelo_sdk.StringFilter{
            Contains: &trimmed_search,
        }
        filter.OR = []neurelo_sdk.ActorWhereInput{
            {
                FirstName: &first_name,
            },
            {
                LastName: &first_name,
            },
        }
    }

    find_actor := lib.NeureloClient.ActorAPI.FindActor(context.Background()).Take(take).Skip(skip).Filter(filter);

    res, _, err := find_actor.Execute()
    if err != nil {
        fmt.Println(err)
        return nil
    }

	return &res.Data
}

func GetTotalActorsSvc(req GetAllActorRequest) *int {
    trimmed_search := strings.TrimSpace(req.Search)
    select_count := neurelo_sdk.ActorAggregateInput{
        Count: []string{
            "actor_id",
        },
    }

    first_name := neurelo_sdk.ActorWhereInputFirstName{}
    filter := neurelo_sdk.ActorWhereInput{}

    if (trimmed_search != "") {
        first_name.StringFilter = &neurelo_sdk.StringFilter{
            Contains: &trimmed_search,
        }
        filter.OR = []neurelo_sdk.ActorWhereInput{
            {
                FirstName: &first_name,
            },
            {
                LastName: &first_name,
            },
        }
    }

    find_actor := lib.NeureloClient.ActorAPI.AggregateByActor(context.Background()).Select_(select_count).Filter(filter);

    res, _, err := find_actor.Execute()
    if err != nil {
        fmt.Println(err)
        return nil
    }

	return res.Data.Count.ActorId
}
