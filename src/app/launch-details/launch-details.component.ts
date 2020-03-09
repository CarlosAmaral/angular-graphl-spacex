import { LaunchDetailsGQL } from './../services/spacexGraphql.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-launch-details',
  templateUrl: './launch-details.component.html',
  styleUrls: ['./launch-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent{

  constructor(
    private readonly route: ActivatedRoute,
    private readonly launchDetailsService: LaunchDetailsGQL
    ) { }

  launchDetails$ = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');
      return this.launchDetailsService.fetch({id});
    }),
    map(res => res.data.launch)
  );
}
