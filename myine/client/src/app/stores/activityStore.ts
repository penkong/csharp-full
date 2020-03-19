import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";
import { history } from "./../../index";
import { toast } from "react-toastify";

// strict mode
configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable loadingInitial = false;
  @observable activity: IActivity | null = null;
  @observable submitting = false;
  @observable target = "";

  // helper fucntion ======================================================================

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  groupActivitiesByDate(activities: IActivity[]) {
    const sortedAcitivites = activities.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    const reduced = sortedAcitivites.reduce((activities, activity) => {
      const date = activity.date.toISOString().split("T")[0];
      activities[date] = activities[date]
        ? [...activities[date], activity]
        : [activity];
      return activities;
    }, {} as { [key: string]: IActivity[] });

    // object.entries return arr of [[key ,value], [key ,value] , ...]
    return Object.entries(reduced);
  }

  // ===========================================================================

  // we use computed when we already have data in store
  // ans we use it like observable.
  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }

  // @action is == transaction + untracked + allowStateChanges
  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      // line top bring back cb but state mutate need be in  an action need for async
      runInAction("loading activities", () => {
        activities.forEach(activity => {
          activity.date = new Date(activity.date);
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading activities error", () => {
        this.loadingInitial = false;
      });
      console.log(error.message);
    }
  };

  @action loadActivitiy = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
      return activity;
    } else {
      this.loadingInitial = true;

      try {
        activity = await agent.Activities.details(id);
        runInAction("getting an activity", () => {
          activity.date = new Date(activity.date);
          this.activityRegistry.set(activity.id, activity);
          this.activity = activity;
          this.loadingInitial = false;
        });
        return activity;
      } catch (error) {
        runInAction("getting an activity Error", () => {
          this.loadingInitial = false;
        });
        // throw error;
        console.log(error);
      }
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      //
      await agent.Activities.create(activity);

      runInAction("create activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        // this.editMode = false;
        this.submitting = false;
      });

      history.push(`/activities/${activity.id}`);
      //
    } catch (error) {
      //
      console.log(error.response);
      toast.error("Problem submitting data!");
      runInAction("create activity error", () => {
        this.submitting = false;
      });
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("edit activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction("delete activity error", () => {
        this.submitting = false;
      });
      console.log(error.response);
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction("delete activity", () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete activity error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };

  @action openCreateForm = () => {
    // this.editMode = true;
    this.activity = null;
  };

  @action selectActivity = (id: string) => {
    this.activity = this.activityRegistry.get(id);
    // this.editMode = false;
  };

  @action openEditForm = (id: string) => {
    this.activity = this.activityRegistry.get(id);
    // this.editMode = true;
  };

  @action cancelActivity = () => {
    this.activity = null;
  };

  @action cancelFormOpen = () => {
    // this.editMode = fals
  };

  @action clearActivity = () => {
    this.activity = null;
  };
}

export default createContext(new ActivityStore());
