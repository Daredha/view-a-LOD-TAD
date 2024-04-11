import { Component, Input } from '@angular/core';
import { isValidHttpUrl, replacePrefixes } from '../../../helpers/util.helper';
import { NgIf } from '@angular/common';
import { CacheService } from '../../../services/cache.service';

@Component({
  selector: 'app-node-link',
  standalone: true,
  imports: [NgIf],
  templateUrl: './node-link.component.html',
  styleUrl: './node-link.component.scss',
})
export class NodeLinkComponent {
  @Input() url?: string;
  @Input() label?: string;

  constructor(public cache: CacheService) {}

  get cachedLabel(): string | undefined {
    if (this?.url) {
      void this.cache.cacheLabelForId(this.url);
      return this.cache.labels?.[this.url] ?? this.label;
    }

    return this.label;
  }

  protected readonly replacePrefixes = replacePrefixes;
  protected readonly isValidHttpUrl = isValidHttpUrl;
}